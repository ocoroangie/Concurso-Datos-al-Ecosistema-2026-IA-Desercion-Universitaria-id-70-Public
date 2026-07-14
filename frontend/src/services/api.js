import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 20000,
});

export default api;
