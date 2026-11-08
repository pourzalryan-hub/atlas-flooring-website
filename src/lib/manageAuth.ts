// Shared auth helpers for the internal Lead Manager (/manage).
//
// Instead of HTTP Basic Auth (which mobile browsers forget constantly), we
// issue a signed, expiring cookie after one password login. The cookie value
// is "<expiry>.<hmac>", where the HMAC is keyed on MANAGE_PASSWORD — so it
// can't be forged, and changing the password instantly invalidates old
// cookies. Uses Web Crypto so it runs in both the Edge middleware and routes.

export const COOKIE_NAME = "atlas_manage";
export const TTL_DAYS = 90;
const PURPOSE = "manage.v1";

const enc = new TextEncoder();

async function hmacHex(key: string, msg: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time string compare (avoids leaking length-of-match via timing).
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function makeToken(password: string, ttlDays = TTL_DAYS): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlDays * 86400;
  const sig = await hmacHex(password, `${PURPOSE}.${exp}`);
  return `${exp}.${sig}`;
}

export async function verifyToken(token: string | undefined, password: string): Promise<boolean> {
  if (!token || !password) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expNum = parseInt(exp, 10);
  if (!Number.isFinite(expNum) || expNum * 1000 < Date.now()) return false;
  const expected = await hmacHex(password, `${PURPOSE}.${exp}`);
  return timingSafeEqual(sig, expected);
}
