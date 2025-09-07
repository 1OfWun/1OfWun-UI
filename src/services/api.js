// src/services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

// Create axios instance
const API = axios.create({
  baseURL: API_URL,
});

// 🔑 Interceptor: Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------- AUTH -----------------
export async function register(username, email, password) {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  const { access_token } = res.data;
  localStorage.setItem("token", access_token);
  return access_token;
}

export async function getMe() {
  const res = await API.get("/auth/me");
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}

// ----------------- PRODUCTS -----------------
export async function getProducts() {
  const res = await API.get("/products/");
  return res.data;
}

export async function createProduct(productData) {
  const res = await API.post("/products/", productData);
  return res.data;
}
