import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const API = axios.create({
  baseURL: API_URL,
});

// 🔑 Attach token to all requests automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ✅ Helper to manually set/remove token in headers
export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

//
// ==================== AUTH ====================
//
export async function register(username, email, password) {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
}

export async function login(email, password) {
  try {
    const res = await API.post("/auth/login", { email, password });
    if (!res.data?.access_token) throw new Error("No token received");

    const token = res.data.access_token;
    localStorage.setItem("token", token);
    setAuthToken(token);

    return token;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
}

export async function getMe() {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (err) {
    console.error("getMe failed:", err.response?.data || err.message);
    throw err;
  }
}

export function logout() {
  localStorage.removeItem("token");
  setAuthToken(null);
}

//
// ==================== PRODUCTS ====================
//
export async function getProducts(page = 1, perPage = 6) {
  const res = await API.get(`/products?page=${page}&per_page=${perPage}`);
  return res.data;
}


export async function createProduct(productData) {
  if (productData instanceof FormData) {
    const res = await API.post("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } else {
    const res = await API.post("/products", productData);
    return res.data;
  }
}

export async function updateProduct(id, productData) {
  if (productData instanceof FormData) {
    const res = await API.put(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } else {
    const res = await API.put(`/products/${id}`, productData);
    return res.data;
  }
}

export async function deleteProduct(id) {
  const res = await API.delete(`/products/${id}`);
  return res.data;
}

//
// ==================== ORDERS ====================
//
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

//
// ==================== USERS ====================
//
export async function getUsers() {
  const res = await API.get("/users");
  return res.data;
}

export async function deleteUser(id) {
  const res = await API.delete(`/users/${id}`);
  return res.data;
}
