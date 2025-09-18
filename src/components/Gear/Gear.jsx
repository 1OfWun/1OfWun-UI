import React, { useState, useEffect, useContext } from "react";
import "./Gear.css";
import { getProducts } from "../../services/api";
import { AppContext } from "../../context/AppContext";

const Gear = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(AppContext);

  const productsPerPage = 6;
  const gearCategories = ["gear", "football", "basketball", "gym", "outdoor"];

  useEffect(() => {
    getProducts()
      .then((data) => {
        const gearItems = data.filter((p) =>
          gearCategories.includes(p.category.toLowerCase())
        );

        const shuffled = gearItems
          .map((p) => ({ ...p, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...p }) => p);

        setProducts(shuffled);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category.toLowerCase())
        ? prev.filter((c) => c !== category.toLowerCase())
        : [...prev, category.toLowerCase()]
    );
    setCurrentPage(1);
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) =>
          selectedCategories.includes(p.category.toLowerCase())
        )
      : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="shop-wrapper">
      <div className="shop-container">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Close Filters" : "Open Filters"}
        </button>

        {showFilters && (
          <div
            className="filters-overlay"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

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
            {gearCategories.map((category) => (
              <div className="filter-option" key={category}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </aside>

        <div className="main-content">
          <section className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>KSH {product.price}.00</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">
                No products found for the selected categories.
              </p>
            )}
          </section>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
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
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p>KSH {selectedProduct.price}</p>
            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={() => addToCart(selectedProduct)}
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
};

export default Gear;
