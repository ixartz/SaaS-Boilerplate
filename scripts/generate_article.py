import os, re, sys, json, uuid, datetime as dt
from typing import List, Optional, Literal, Dict
from urllib.parse import urlparse

import requests
from pydantic import BaseModel, HttpUrl, field_validator, model_validator
from fastapi import HTTPException
from dateutil import tz as _tz

# Keep your existing globals like VALID_TONES / VALID_GOALS defined elsewhere
# WORDCOUNT_MAP, VALID_TONES, VALID_GOALS are expected to exist.
VALID_TONES = {
    "professional",
    "conversational",
    "educational",
    "inspirational",
    "persuasive",
    "storytelling",
}
VALID_GOALS = {"traffic", "leads", "sales"}


class GenerateRequest(BaseModel):
    # --- Your existing fields ---
    user_id: str
    subreddits: List[str]  # 1–5, like ["FIRE","overemployed"]
    tones: List[Literal["professional","conversational","educational","inspirational","persuasive","storytelling"]]
    goals: List[str]       # validate against VALID_GOALS below
    do_not_recommend_products: bool
    website: Optional[HttpUrl] = None

    # --- WordPress site & auth (user-provided) ---
    # Choose ONE auth method:
    #   - application_password  (self-hosted WP core REST)
    #   - bearer                (WordPress.com/Jetpack via WP.com OAuth2 token)
    wordpress_auth_type: Literal["application_password","bearer"]

    # Self-hosted (Application Password) path:
    wordpress_base_url: Optional[HttpUrl] = None     # e.g., https://mysite.com
    wordpress_username: Optional[str] = None
    wordpress_app_password: Optional[str] = None

    # WP.com / Jetpack (Bearer token) path:
    wordpress_site: Optional[str] = None             # e.g., example.com or example.wordpress.com (or numeric site id)
    wordpress_bearer_token: Optional[str] = None

    # Posting
    publish_mode: Literal["now","schedule","draft"] = "draft"
    scheduled_time_local: Optional[str] = None       # "HH:MM" in user's tz
    timezone: Optional[str] = "America/Los_Angeles"

    # ---------- Validators (Pydantic v2) ----------
    @field_validator("subreddits")
    @classmethod
    def v_subs(cls, v: List[str]) -> List[str]:
        if not (1 <= len(v) <= 5):
            raise ValueError("Provide 1 to 5 subreddits.")
        cleaned = []
        for s in v:
            s = s.strip().lstrip("r/").split("/")[0]
            if not re.fullmatch(r"[A-Za-z0-9_]+", s):
                raise ValueError(f"Invalid subreddit: {s}")
            cleaned.append(s)
        return cleaned

    @field_validator("tones")
    @classmethod
    def v_tones(cls, v: List[str]) -> List[str]:
        if len(v) < 1:
            raise ValueError("At least one tone is required.")
        for t in v:
            if t not in VALID_TONES:
                raise ValueError(f"Invalid tone: {t}")
        return v

    @field_validator("goals")
    @classmethod
    def v_goals(cls, v: List[str]) -> List[str]:
        if len(v) < 1:
            raise ValueError("At least one goal is required.")
        for g in v:
            if g not in VALID_GOALS:
                raise ValueError(f"Invalid goal: {g}")
        return v

    @model_validator(mode="after")
    def _validate_wp_auth(self):
        """
        Require correct fields based on wordpress_auth_type:
        - application_password -> need wordpress_base_url, wordpress_username, wordpress_app_password
        - bearer              -> need wordpress_site, wordpress_bearer_token
        """
        if self.wordpress_auth_type == "application_password":
            missing = []
            if not self.wordpress_base_url:     missing.append("wordpress_base_url")
            if not self.wordpress_username:     missing.append("wordpress_username")
            if not self.wordpress_app_password: missing.append("wordpress_app_password")
            if missing:
                raise ValueError(f"For application_password auth, provide: {', '.join(missing)}")
        else:
            missing = []
            if not self.wordpress_site:         missing.append("wordpress_site")
            if not self.wordpress_bearer_token: missing.append("wordpress_bearer_token")
            if missing:
                raise ValueError(f"For bearer auth (OAuth2), provide: {', '.join(missing)}")
        return self


# ---------- Header helpers ----------
def wp_headers_self_hosted(username: str, app_password: str) -> Dict[str, str]:
    # Basic auth header for Application Passwords (self-hosted WP)
    return {"Authorization": requests.auth._basic_auth_str(username, app_password)}

def wp_headers_wpcom(bearer_token: str) -> Dict[str, str]:
    # OAuth2 Bearer header for WordPress.com/Jetpack
    return {"Authorization": f"Bearer {bearer_token}"}


# ---------- Publisher (supports BOTH app-password + bearer) ----------
def publish_to_wordpress(
    cfg: GenerateRequest,
    article: Dict[str, str],
    image_data_url: str,
    publish_mode: str,
    scheduled_time_local: Optional[str]
):
    # Determine endpoints + headers based on auth type
    if cfg.wordpress_auth_type == "application_password":
        base = str(cfg.wordpress_base_url).rstrip("/")
        posts_url = f"{base}/wp-json/wp/v2/posts"
        media_url = f"{base}/wp-json/wp/v2/media"
        auth_headers = wp_headers_self_hosted(cfg.wordpress_username, cfg.wordpress_app_password)
    else:
        # WordPress.com/Jetpack via WP.com proxy endpoints
        site = cfg.wordpress_site  # domain or numeric site id
        posts_url = f"https://public-api.wordpress.com/wp/v2/sites/{site}/posts"
        media_url = f"https://public-api.wordpress.com/wp/v2/sites/{site}/media"
        auth_headers = wp_headers_wpcom(cfg.wordpress_bearer_token)

    # Optional featured image upload
    media_id = None
    try:
        if image_data_url and image_data_url.startswith("data:image/png;base64,"):
            import base64
            binary = base64.b64decode(image_data_url.split(",")[1])
            headers = {
                "Content-Disposition": f'attachment; filename="ai-image-{uuid.uuid4().hex}.png"',
                **auth_headers
            }
            r = requests.post(media_url, headers=headers, data=binary, timeout=30)
            if r.ok:
                media_id = r.json().get("id")
    except Exception:
        pass

    payload = {
        "title": article.get("title") or "Untitled",
        "content": (article.get("subtitle","") and f"**{article['subtitle']}**\n\n") + (article.get("body_markdown","") or ""),
        "status": "draft",
    }
    if media_id:
        payload["featured_media"] = media_id

    # Determine status/time
    if publish_mode == "now":
        payload["status"] = "publish"
    elif publish_mode == "schedule":
        tz_user = _tz.gettz(cfg.timezone or "America/Los_Angeles")
        now_local = dt.datetime.now(tz_user)
        hh, mm = map(int, (scheduled_time_local or "09:00").split(":"))
        target_local = now_local.replace(hour=hh, minute=mm, second=0, microsecond=0)
        if target_local <= now_local:
            target_local = target_local + dt.timedelta(days=1)
        target_gmt = target_local.astimezone(_tz.gettz("UTC"))
        payload["status"] = "future"
        payload["date_gmt"] = target_gmt.replace(tzinfo=None).isoformat()

    r = requests.post(
        posts_url,
        headers={**auth_headers, "Content-Type": "application/json"},
        json=payload,
        timeout=30
    )
    if not r.ok:
        raise HTTPException(r.status_code, f"WordPress error: {r.text}")
    return r.json()


def generate_article(data: dict) -> str:
    accounts = data.get("accounts", {})
    config = data.get("config", {})
    topic = config.get("topic", "your topic")
    connections = ", ".join(accounts.keys()) or "no connections"
    return f"Generated article about {topic} using {connections}."


if __name__ == "__main__":
    payload = {}
    if len(sys.argv) > 1:
        try:
            payload = json.loads(sys.argv[1])
        except Exception:
            pass
    print(generate_article(payload))
