import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getProducts } from "../../services/api";
import "./Shop.css";
import { toast } from "react-toastify";

function Shop() {
  const { addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        const filteredForShop = data.filter(
          (p) =>
            shopCategories.includes(p.category.toLowerCase()) &&
            !gearCategories.includes(p.category.toLowerCase())
        );

        const shuffled = filteredForShop
          .map((p) => ({ ...p, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...p }) => p);

        setProducts(shuffled);
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
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((p) =>
        selectedCategories.includes(p.category.toLowerCase())
      )
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfLastProduct - productsPerPage,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="shop-wrapper">
      <div className="shop-container">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Close Filters" : "Open Filters"}
        </button>

        <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
          <div className="filter-header">
            <h3>Filters</h3>
            <button
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              &times;
            </button>
          </div>
          <div className="filter-group">
            <h3>Categories</h3>
            {shopCategories.map((category) => (
              <div className="filter-option" key={category}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </aside>

        {showFilters && (
          <div
            className="filters-overlay"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        <div className="main-content">
          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="image-container">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      loading="lazy"
                      style={{
                        background: `url(${product.placeholder}) center/cover no-repeat`,
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>KSH {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">
                No products found for the selected filters.
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
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

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              loading="lazy"
            />
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p>KSH {selectedProduct.price}</p>
            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  toast.success(`${selectedProduct.name} added to cart 🛒`);
                }}
              >
                Add to Cart
              </button>
              <button
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
