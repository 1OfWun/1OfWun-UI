import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getProducts } from "../../services/api";
import "./Shop.css";

function Shop() {
  const { addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((p) => selectedCategories.includes(p.category))
    : products;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="shop-container">
      {/* Sidebar Filters */}
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Close Filters" : "Open Filters"}
      </button>

      {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)} />}

      <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
        <div className="filter-group">
          <h3>Categories</h3>
          <div className="filter-option">
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes("clothing")}
                onChange={() => toggleCategory("clothing")}
              />
              Clothing
            </label>
          </div>
          <div className="filter-option">
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes("shoes")}
                onChange={() => toggleCategory("shoes")}
              />
              Shoes
            </label>
          </div>
          <div className="filter-option">
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes("gear")}
                onChange={() => toggleCategory("gear")}
              />
              Gear
            </label>
          </div>
        </div>
      </aside>

      <div className="main-content">
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                {product.image && (
                  <img src={product.image} alt={product.name} />
                )}
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
              </div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
