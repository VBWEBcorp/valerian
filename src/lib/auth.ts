import { createHmac, timingSafeEqual } from "crypto";

type AuthEnv = {
  sessionSecret: string;
  adminEmail: string;
  adminPasswordHash: string;
  adminPasswordSalt: string;
};

function getAuthEnv(): AuthEnv {
  const sessionSecret = process.env.SESSION_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPasswordSalt = process.env.ADMIN_PASSWORD_SALT;

  if (!sessionSecret || !adminEmail || !adminPasswordHash || !adminPasswordSalt) {
    throw new Error("Auth env vars are missing");
  }

  return {
    sessionSecret,
    adminEmail,
    adminPasswordHash,
    adminPasswordSalt,
  };
}

type SessionPayload = {
  email: string;
  exp: number;
};

export function verifyCredentials(email: string, password: string) {
  const { adminEmail, adminPasswordHash, adminPasswordSalt } = getAuthEnv();
  if (email !== adminEmail) {
    return false;
  }
  const hash = createHmac("sha256", adminPasswordSalt)
    .update(password)
    .digest("hex");
  const a = Buffer.from(hash);
  const b = Buffer.from(adminPasswordHash);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createSessionToken(email: string, ttlSeconds = 60 * 60 * 24 * 7) {
  const { sessionSecret } = getAuthEnv();
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const raw = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", sessionSecret).update(raw).digest("base64url");
  return `${raw}.${sig}`;
}

export function verifySessionToken(token: string | undefined) {
  const { sessionSecret } = getAuthEnv();
  if (!token) return null;
  const [raw, sig] = token.split(".");
  if (!raw || !sig) return null;
  const expected = createHmac("sha256", sessionSecret).update(raw).digest("base64url");
  if (expected.length !== sig.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) {
    return null;
  }
  const payload = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SessionPayload;
  if (!payload?.email || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return payload;
}
