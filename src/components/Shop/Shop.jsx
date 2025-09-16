// Shop.js
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getProducts } from "../../services/api";
import "./Shop.css"; // Ensure this CSS is correctly imported and applied

function Shop() {
  const { addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Manages visibility of the filter sidebar

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Keep consistent, or adjust as needed

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        // Assuming products from API might lack a direct 'image' field or image_url
        // Use a placeholder if no image is available from the API
        const productsWithImages = data.map(product => ({
          ...product,
          // Prioritize product.image_url if available, otherwise product.image, then placeholder
          image: product.image_url || product.image || `https://via.placeholder.com/200?text=${product.name.replace(/\s/g, '+')}`
        }));
        setProducts(productsWithImages);
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
    // When a filter is applied/removed, reset to the first page
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((p) => selectedCategories.includes(p.category.toLowerCase())) // Ensure case-insensitive matching
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="shop-wrapper">
      <div className="shop-container">
        {/* Filter Toggle Button for mobile/tablet */}
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Close Filters" : "Open Filters"}
        </button>

        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
          <div className="filter-header">
             <h3>Filters</h3>
             <button className="close-filters" onClick={() => setShowFilters(false)}>
                &times; {/* Close icon */}
             </button>
          </div>
          <div className="filter-group">
            <h3>Categories</h3>
            {/* Make sure these categories match your API's categories (case-insensitive if possible) */}
            {["clothing", "shoes", "gear"].map(category => (
                <div className="filter-option" key={category}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize for display */}
                    </label>
                </div>
            ))}
          </div>
          {/* Add more filter groups as needed */}
        </aside>

        {/* Overlay to close filters when clicked outside on mobile/tablet */}
        {showFilters && (
          <div className="filters-overlay" onClick={() => setShowFilters(false)}></div>
        )}

        {/* Main Content with Products */}
        <div className="main-content">
          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>KSH {product.price}</p>
                  </div>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p className="no-products">No products found for the selected filters.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;