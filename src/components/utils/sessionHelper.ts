import Cookies from 'js-cookie';


const COOKIE_KEY = 'lr-session-token';
const SESSION_KEY = 'LRTokenKey';

// Store the access token in cookies + sessionStorage
export function setSession(accessToken: string) {
  if (!accessToken) return;

  // Store in cookies (expires in 1 day — adjust as needed)
  Cookies.set(COOKIE_KEY, accessToken, { expires: 1, secure: true, sameSite: 'Strict' });

  // Store in sessionStorage
  sessionStorage.setItem(SESSION_KEY, accessToken);
}

// Retrieve the token (cookies first, then sessionStorage)
export function getSessionToken(): string | null {
  return Cookies.get(COOKIE_KEY) || sessionStorage.getItem(SESSION_KEY) || null;
}

// Remove token from both
export function logout() {
  Cookies.remove(COOKIE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  window.location.reload();
}

// Check if the current session is valid
export function isAuthenticated(): boolean {
  const token = getSessionToken();
  if (!token) return false;
  return true;
}
