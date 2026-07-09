import axios from "axios";
import { getToken } from "../utils/token";
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
API.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
