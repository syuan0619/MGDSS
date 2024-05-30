import axios from "axios";

const api = axios.create({ baseURL: "https://mgdss-docker.onrender.com" });
export default api;
