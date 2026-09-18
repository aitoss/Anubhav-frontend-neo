import axios from "axios"

// Same-origin on purpose: requests go to this app's /api/anubhav proxy so the
// browser never has to clear CORS. Auth is proxied through /api/auth for the
// same reason, which also means the SuperTokens session cookie is set on our
// origin and therefore gets sent on these calls.
const protectedAxios = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  timeout: 15000,
})

export default protectedAxios
