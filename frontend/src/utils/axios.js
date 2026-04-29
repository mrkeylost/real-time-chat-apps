import axios from "axios";

// no localhost in prod, make this dynamic
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/_/backend/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
