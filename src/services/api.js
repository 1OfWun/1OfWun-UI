// src/services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

const API = axios.create({
  baseURL: API_URL,
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

// AUTH
export async function register(username, email, password) {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
}
export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data.access_token;
}
export async function getMe() {
  const res = await API.get("/auth/me");
  return res.data;
}
export function logout() {
  localStorage.removeItem("token");
}

// PRODUCTS
export async function getProducts() {
  const res = await API.get("/products");
  return res.data;
}

// Create product: will accept either FormData or JSON
export async function createProduct(productData) {
  // productData can be FormData (with file) or a plain object
  if (productData instanceof FormData) {
    const res = await API.post("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } else {
    const res = await API.post("/products", productData); // JSON
    return res.data;
  }
}

export async function updateProduct(id, productData) {
  const res = await API.put(`/products/${id}`, productData);
  return res.data;
}
export async function deleteProduct(id) {
  const res = await API.delete(`/products/${id}`);
  return res.data;
}

// ORDERS
export async function createOrder(payload) {
  const res = await API.post("/orders", payload);
  return res.data;
}
export async function getOrders() {
  const res = await API.get("/orders");
  return res.data;
}
export async function updateOrderStatus(id, status) {
  const res = await API.patch(`/orders/${id}`, { status });
  return res.data;
}
export async function deleteOrder(id) {
  const res = await API.delete(`/orders/${id}`);
  return res.data;
}

// USERS
export async function getUsers() {
  const res = await API.get("/users");
  return res.data;
}
export async function deleteUser(id) {
  const res = await API.delete(`/users/${id}`);
  return res.data;
}
