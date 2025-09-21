// frontend/src/services/api.js
import axios from "axios";

//
// ==================== CONFIG ====================
//
const API_URL = "https://oneofwun-db.onrender.com/api";

export const API = axios.create({
  baseURL: API_URL,
});

// 🔑 Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

//
// ==================== HELPERS ====================
//
function normalizeProducts(data) {
  return data.map((p) => ({
    ...p,
    // backend now returns `image` (Cloudinary URL)
    image: p.image || `https://via.placeholder.com/200?text=${encodeURIComponent(p.name)}`,
  }));
}

//
// ==================== AUTH ====================
//
export async function register(username, email, password) {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  if (!res.data?.access_token) throw new Error("No token received");

  const token = res.data.access_token;
  localStorage.setItem("token", token);
  setAuthToken(token);

  return token;
}

export async function getMe() {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (err) {
    console.error("getMe failed:", err.response?.data || err.message);
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  setAuthToken(null);
}

//
// ==================== PRODUCTS ====================
//
export async function getProducts() {
  try {
    const res = await API.get(`/products?per_page=1000`);
    let items = [];

    if (res.data?.items) items = res.data.items;
    else if (Array.isArray(res.data)) items = res.data;

    return normalizeProducts(items);
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export async function createProduct(productData) {
  try {
    const res = await API.post("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Create product failed:", err.response?.data || err.message);
    return null;
  }
}

export async function updateProduct(id, productData) {
  try {
    const res = await API.put(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Update product failed:", err.response?.data || err.message);
    return null;
  }
}




export async function deleteProduct(id) {
  try {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete product failed:", err.response?.data || err.message);
    return null;
  }
}

//
// ==================== ORDERS ====================
//
export async function createOrder(payload) {
  try {
    const res = await API.post("/orders", payload);
    return res.data;
  } catch (err) {
    console.error("Create order failed:", err.response?.data || err.message);
    return null; 
  }
}

export async function getOrders() {
  try {
    const res = await API.get("/orders");
    return res.data || [];
  } catch (err) {
    console.error("Get orders failed:", err.response?.data || err.message);
    return [];
  }
}

export async function updateOrderStatus(id, status) {
  try {
    const res = await API.patch(`/orders/${id}`, { status });
    return res.data;
  } catch (err) {
    console.error("Update order status failed:", err.response?.data || err.message);
    return null;
  }
}

export async function deleteOrder(id) {
  try {
    const res = await API.delete(`/orders/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete order failed:", err.response?.data || err.message);
    return null;
  }
}

//
// ==================== USERS ====================
//
export async function getUsers() {
  try {
    const res = await API.get("/users");
    return res.data || [];
  } catch (err) {
    console.error("Get users failed:", err.response?.data || err.message);
    return [];
  }
}

export async function deleteUser(id) {
  try {
    const res = await API.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete user failed:", err.response?.data || err.message);
    return null;
  }
}
