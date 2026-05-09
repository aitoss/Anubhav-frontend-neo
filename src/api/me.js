import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getMe = () =>
  axios.get(`${BACKEND_URL}/me`).then((r) => r.data.user);

export const updateMe = (payload) =>
  axios.patch(`${BACKEND_URL}/me`, payload).then((r) => r.data.user);

export const getMyArticles = ({ page = 1, limit = 10 } = {}) =>
  axios
    .get(`${BACKEND_URL}/me/articles`, { params: { page, limit } })
    .then((r) => r.data);
