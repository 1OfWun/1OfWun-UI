import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import "./ProductsPage.css";

const shopCategories = [
  "thrifts",
  "labels",
  "old money",
  "summer-time",
  "y2k",
  "bags",
  "jewelry",
  "shoes",
  "headwear",
];

const gearCategories = ["gear", "football", "basketball", "gym", "outdoor"];

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    featured: false,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("featured", form.featured);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await updateProduct(editingId, formData);
        setEditingId(null);
      } else {
        await createProduct(formData);
      }

      setForm({
        name: "",
        price: "",
        category: "",
        featured: false,
        image: null,
      });
      e.target.reset();
      loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      featured: product.featured || false,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="products-page">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (KSH)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">-- Select Category --</option>
          <optgroup label="Shop Categories">
            {shopCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </optgroup>
          <optgroup label="Gear Categories">
            {gearCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </optgroup>
        </select>

        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Mark as Featured
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (KSH)</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.featured ? "Yes" : "No"}</td>
                <td>
                  {p.image_url || p.image ? (
                    <img src={p.image_url || p.image} alt={p.name} />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
