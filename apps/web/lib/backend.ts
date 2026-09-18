const fallbackURL = "https://oss-backend.vercel.app/api/anubhav"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || fallbackURL

// Origin only. Authenticated calls must go straight to the backend: SuperTokens
// sets its session cookie on this origin, and a cookie set there is never sent
// to our own origin, so routing them through /api/anubhav loses the session.
export const BACKEND_ORIGIN = new URL(BACKEND_URL).origin
