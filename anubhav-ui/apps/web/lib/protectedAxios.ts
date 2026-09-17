import axios from "axios"

const protectedAxios = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  timeout: 15000,
})

protectedAxios.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token && config && config.headers) {
        ;(config.headers as any).Authorization = `Bearer ${token}`
      }
    }
  } catch (err) {
    // ignore
  }
  return config
})

export default protectedAxios
