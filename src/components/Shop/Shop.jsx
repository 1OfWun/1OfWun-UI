import React, { useState, useContext } from 'react';
import './Shop.css';
import Ferrari_jacket from '../../assets/Ferrari_jacket.png';
import Purple_sweat_shirt from '../../assets/Purple_sweat_shirt.png';
import jOCK from '../../assets/jOCK.png';
import Orange_front from '../../assets/Orange_front.png';
import Sweat_hoodie from '../../assets/Sweat_hoodie.png';
import CH from '../../assets/CH.png';
import js from '../../assets/js.png';
import CL from '../../assets/CL.png';
import CH_Beanie from '../../assets/CH_Beanie.png';
import { AppContext } from '../../context/AppContext';

const products = [
  { id: 1, name: 'Ferrari Jacket', price: 74, category: "Labels", image: Ferrari_jacket },
  { id: 2, name: 'Sweat Shirt', price: 74, category: "Old Money", image: Purple_sweat_shirt },
  { id: 3, name: 'College Jacket', price: 70, category: "Thrifts", image: jOCK },
  { id: 4, name: 'Old School Long Sleeve', price: 74, category: "Old Money", image: Orange_front },
  { id: 5, name: 'Sweater', price: 84, category: "Thrifts", image: Sweat_hoodie },
  { id: 6, name: 'Thrifts Hoodie', price: 65, category: "Thrifts", image: CH },
  { id: 7, name: 'Old Money Jacket', price: 90, category: "Old Money", image: js },
  { id: 8, name: 'Luxury Bag', price: 120, category: "Labels", image: CL },
  { id: 9, name: 'Trendy Sunglasses', price: 40, category: "Jewelry", image: CH_Beanie },
];

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 6;
  const { addToCart } = useContext(AppContext);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategories.length > 0
    ? products.filter(product => selectedCategories.includes(product.category))
    : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="shop-container">
      {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)}></div>}

      <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
        <div className="filter-group">
          <h3>Categories</h3>
          {["Thrifts", "Old Money", "Labels", "Gear", "Shoes", "Jewelry"].map(category => (
            <div className="filter-option" key={category}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Close Filters" : "Open Filters"}
        </button>

        <section className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
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
                    alert(`${product.name} added to cart`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for the selected filters.</p>
          )}
        </section>

        {totalPages > 1 && (
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
        )}
      </main>
    </div>
  );
};

export default Shop;