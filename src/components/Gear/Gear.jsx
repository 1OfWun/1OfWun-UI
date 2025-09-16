import React, { useState, useEffect, useContext } from 'react';
import './Gear.css'; 
import { getProducts } from '../../services/api';
import { AppContext } from '../../context/AppContext';

const Gear = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useContext(AppContext);

  const productsPerPage = 6; 

  useEffect(() => {
    getProducts()
      .then((data) => {
        const gearItems = data
          .filter(
            (p) =>
              p.category.toLowerCase() === "gear" ||
              p.category.toLowerCase() === "football" ||
              p.category.toLowerCase() === "basketball" ||
              p.category.toLowerCase() === "gym" || 
              p.category.toLowerCase() === "outdoor" 
          )
          .map(product => ({
            ...product,
            image: product.image_url || product.image || `https://via.placeholder.com/200?text=${product.name.replace(/\s/g, '+')}`
          }));
        setProducts(gearItems);
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
      ? products.filter((product) =>
          selectedCategories.includes(product.category.toLowerCase())
        )
      : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="shop-wrapper"> 
      <div className="shop-container">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Close Filters" : "Open Filters"}
        </button>

        {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)}></div>}

        <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
          <div className="filter-header">
             <h3>Filters</h3>
             <button className="close-filters" onClick={() => setShowFilters(false)}>
                &times;
             </button>
          </div>
          <div className="filter-group">
            <h3>Categories</h3>
            {["Football", "Basketball", "Gym", "Outdoor"].map((category) => (
              <div className="filter-option" key={category}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onChange={() => handleCategoryChange(category)}
                  />{" "}
                  {category}
                </label>
              </div>
            ))}
          </div>
        </aside>

        <div className="main-content">
          <section className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>KSH {product.price}.00</p>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="no-products">No products found for the selected categories.</p>
            )}
          </section>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gear;