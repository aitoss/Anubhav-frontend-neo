const fallbackURL = "https://oss-backend-staging.vercel.app/api/anubhav";

export const BACKEND_URL = process.env.VITE_BACKEND_URL || fallbackURL;
export const YOUTUBE_PLAYLIST =
  "https://www.youtube.com/watch?v=c58BoAV2dPc&list=PL4REmU9xh1P14Qv0zmwjve_myZI_rOguU&index=";