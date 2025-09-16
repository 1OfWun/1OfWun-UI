// src/Dashboard/ProductsPage.jsx (or .js)
import React, { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../services/api";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image_file: null,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image_file: e.target.files[0] });
  };

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", newProduct.name);
      form.append("price", newProduct.price);
      form.append("category", newProduct.category);
      if (newProduct.image_file) form.append("image", newProduct.image_file);

      await createProduct(form);
      setNewProduct({ name: "", price: "", category: "", image_file: null });
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error adding product. Check console for details.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error("Delete product failed:", err);
      alert("Delete failed. Check console.");
    }
  }

  return (
    <div>
      <h1>📦 Products</h1>

      <form onSubmit={handleAdd} className="product-form">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>

      <table className="dashboard-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>KSH {p.price}</td>
              <td>{p.category}</td>
              <td>
                {p.image_url ? (
                  <img src={p.image_url.startsWith("/") ? p.image_url : p.image_url} alt={p.name} style={{ width: 80 }} />
                ) : "—"}
              </td>
              <td>
                <button onClick={() => handleDelete(p.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
