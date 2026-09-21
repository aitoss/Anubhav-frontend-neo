const fallbackURL = "https://oss-backend.vercel.app/api/anubhav"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || fallbackURL

// Origin only, for the /api/auth proxy to forward SuperTokens' own calls to.
export const BACKEND_ORIGIN = new URL(BACKEND_URL).origin
