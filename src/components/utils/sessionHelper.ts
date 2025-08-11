import Cookies from "js-cookie";
import { SSOLogin } from "../../lib/loginradius-react-sdk";

const COOKIE_KEY = "lr-session-token";
const SESSION_KEY = "LRTokenKey";

// fire a same-tab event so AuthContext can react immediately
function notifyAuthChange() {
  window.dispatchEvent(new CustomEvent("lr:auth-change"));
}

export function setSession(accessToken: string) {
  if (!accessToken) return;

  // Only set `secure` when actually on https to avoid localhost issues
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";

  // Cookies: optional cache (NOT httpOnly here). Keep SameSite=Lax unless you need Strict.
  Cookies.set(COOKIE_KEY, accessToken, {
    expires: 1,                // 1 day
    secure: isHttps,           // avoid failing on localhost
    sameSite: "Lax",
    path: "/",
  });

  // Session (canonical for SPA)
  sessionStorage.setItem(SESSION_KEY, accessToken);

  notifyAuthChange();          // <— important
}

export function getSessionToken(): string | null {
  // Prefer sessionStorage (canonical); cookie is fallback
  return sessionStorage.getItem(SESSION_KEY) || Cookies.get(COOKIE_KEY) || null;
}

export function clearSession() {
  Cookies.remove(COOKIE_KEY, { path: "/" });
  sessionStorage.removeItem(SESSION_KEY);
  notifyAuthChange();          // <— important
}

export function logout() {
  clearSession();              // single place
}

export function isAuthenticated(): boolean {
  return !!getSessionToken();
}
