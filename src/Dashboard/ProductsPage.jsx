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
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    featured: false,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();

      console.log("API response:", data);

      if (Array.isArray(data)) {
        setProducts(data);
        setTotalPages(1);
      } else {
        setProducts(data.items || []);
        setTotalPages(data.pages || 1);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.price || !form.category) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("featured", form.featured);
    if (form.image) {
      formData.append("image", form.image);
    }

    const token = localStorage.getItem("token"); 

    if (editingId) {
      await updateProduct(editingId, formData, token);
      setEditingId(null);
    } else {
      await createProduct(formData, token);
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
    setError(`Failed to save product: ${err.message || err}`);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        setError(`Failed to delete product: ${error.message || error}`);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="products-page">
      <div className="header-section">
        <h2>Manage Products</h2>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* --- Form --- */}
      <div className="form-card">
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} className="product-form">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              placeholder="e.g., Red J1's"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          {/* Price */}
          <div className="form-group">
            <label htmlFor="productPrice">Price (KSH)</label>
            <input
              id="productPrice"
              type="number"
              placeholder="e.g., 2399"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              min="0"
            />
          </div>
          {/* Category */}
          <div className="form-group">
            <label htmlFor="productCategory">Category</label>
            <select
              id="productCategory"
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
          </div>
          {/* Featured */}
          <div className="form-group checkbox-group">
            <input
              id="productFeatured"
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <label htmlFor="productFeatured">Mark as Featured</label>
          </div>
          {/* Image */}
          <div className="form-group">
            <label htmlFor="productImage" className="file-input-label">
              Upload Image
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            {form.image && <span className="file-name">{form.image.name}</span>}
            {!form.image && editingId && (
              <span className="file-name">
                Current image will be kept if not changed.
              </span>
            )}
          </div>

          {/* Buttons */}
          <button type="submit" className="submit-button">
            {editingId ? "Update Product" : "Create Product"}
          </button>
          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  price: "",
                  category: "",
                  featured: false,
                  image: null,
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* --- Product list --- */}
      <div className="products-list-section">
        <h3>Existing Products</h3>
        {loading ? (
          <p className="loading-message">Loading products...</p>
        ) : !products || products.length === 0 ? (
          <p className="no-products-message">
            No products found. Add some above!
          </p>
        ) : (
          <div>
            <div className="product-cards-container">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                 <div className="product-card-image">
                    {p.thumbnail || p.image ? (
                      <img src={p.thumbnail || p.image} alt={p.name} />
                    ) : (
                      <div className="no-image-placeholder">No Image</div>
                    )}
                </div>

                  <div className="product-card-details">
                    <h4>{p.name}</h4>
                    <p className="price">KSH {p.price}</p>
                    <p className="category">
                      {p.category.charAt(0).toUpperCase() +
                        p.category.slice(1)}
                    </p>
                    <p className="featured">
                      Featured: {p.featured ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="product-card-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
