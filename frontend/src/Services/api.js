import axios from "axios";
import { getToken } from "../utils/token";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
