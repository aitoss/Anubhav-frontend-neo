import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getUser = (id) =>
  axios.get(`${BACKEND_URL}/users/${id}`).then((r) => r.data.user);

export const getUserArticles = (id, { page = 1, limit = 10 } = {}) =>
  axios
    .get(`${BACKEND_URL}/users/${id}/articles`, { params: { page, limit } })
    .then((r) => r.data);
