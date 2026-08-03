// Cryptographic authentication service for Soner Erdevir Portfolio Admin
const SALT = "serdevir_portfolio_admin_salt_2026";
// SHA-256 hash of "serdevir_portfolio_admin_salt_2026:serdevir:19552260"
const TARGET_HASH = "29be44d043b1fe1548f6acf729a2b4f803e1741fa2ac716339f0df1723fe5daa";
const AUTH_KEY = "serdevir_admin_session_token";

/**
 * Computes SHA-256 hex digest using Web Crypto API
 */
async function computeHash(username, password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${SALT}:${username}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies credentials securely
 */
export async function authenticateAdmin(username, password) {
  if (!username || !password) return false;
  const hash = await computeHash(username.trim(), password.trim());
  if (hash === TARGET_HASH) {
    const sessionToken = btoa(`${username}:${Date.now()}:${Math.random()}`);
    sessionStorage.setItem(AUTH_KEY, sessionToken);
    localStorage.setItem(AUTH_KEY + "_remember", sessionToken);
    return true;
  }
  return false;
}

/**
 * Checks if current user is logged in as admin
 */
export function isAdminAuthenticated() {
  const token = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY + "_remember");
  return Boolean(token);
}

/**
 * Logs out the admin session
 */
export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY + "_remember");
}
