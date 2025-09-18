import axios from "axios";

const API_URL = "https://oneofwun-db.onrender.com/api";
const API_BASE = "https://oneofwun-db.onrender.com"; // prepend for images

export const API = axios.create({
  baseURL: API_URL,
});

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

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

// ==================== PRODUCT NORMALIZER ====================
function normalizeProducts(data) {
  return data.map((p) => ({
    ...p,
    image: p.image_url
      ? `${API_BASE}${p.image_url}`
      : p.image
      ? `${API_BASE}${p.image}`
      : `https://via.placeholder.com/200?text=${p.name.replace(/\s/g, "+")}`,
  }));
}

// ==================== PRODUCTS ====================
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
