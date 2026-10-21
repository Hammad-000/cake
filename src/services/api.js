import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

// har request pe token attach karo (agar hai)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// debugging ke liye — console mein URL dikhega
API.interceptors.request.use((config) => {
  console.log("→ API Request:", (config.baseURL || "") + config.url);
  return config;
});

export default API;