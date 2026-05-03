const fallbackURL = "https://oss-backend-staging.vercel.app/api/anubhav";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || fallbackURL;
export const YOUTUBE_PLAYLIST =
  "https://www.youtube.com/watch?v=c58BoAV2dPc&list=PL4REmU9xh1P14Qv0zmwjve_myZI_rOguU&index=";

const LOGO_DEV_TOKEN = "pk_CpFL-9mKSGekK5eOgAGi2g";
export const getCompanyLogoUrl = (name) =>
  `https://img.logo.dev/name/${encodeURIComponent(name)}?token=${LOGO_DEV_TOKEN}&retina=true`;
