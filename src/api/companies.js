import axios from "axios";
import { BACKEND_URL } from "../constants";

export const searchCompanies = ({ q = "", limit = 10, signal } = {}) =>
  axios
    .get(`${BACKEND_URL}/searchCompanies`, {
      params: { q, limit },
      signal,
    })
    .then((r) => r.data?.data || []);
