import protectedAxios from "./protectedAxios"

export type CompanyCount = {
  company: string
  count: number
  domain?: string | null
}

// Publishable logo.dev key — same one the Vite app shipped in its client bundle.
const LOGO_DEV_TOKEN = "pk_CpFL-9mKSGekK5eOgAGi2g"

export function getCompanyLogoUrl(name: string) {
  return `https://img.logo.dev/name/${encodeURIComponent(name)}?token=${LOGO_DEV_TOKEN}&retina=true`
}

export async function fetchCompanyCounts() {
  return protectedAxios
    .get<{ success: boolean; data: CompanyCount[] }>("/api/anubhav/countCompanies")
    .then((res) => res.data.data ?? [])
}
