import axios from "axios";

axios.defaults.responseType = "json";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});


API.interceptors.request.use(
  async (config) => {
    const api_key = process.env.NEXT_PUBLIC_API_SECRET_KEY;
    config.headers["x-api-key"] = api_key;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API };
