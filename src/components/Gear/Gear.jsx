import React, { useState, useContext } from 'react';
import './Gear.css';
import Arsenal from '../../assets/Sports/Arsenal.png';
import city from '../../assets/Sports/city.png';
import manu from '../../assets/Sports/manu.png';
import chelsea from '../../assets/Sports/chelsea.png';
import Liverpool from '../../assets/Sports/Liverpool.png';
import Cavs from '../../assets/Sports/Cavs.png';
import Merc from '../../assets/Sports/Merc.png';
import pinkp from '../../assets/Sports/pinkp.png';
import whiteadd from '../../assets/Sports/whiteadd.png';
import whitenike from '../../assets/Sports/whitenike.png';
import bluejs from '../../assets/Sports/bluejs.png';
import pinkj from '../../assets/Sports/pinkj.png';
import Caveliananba from '../../assets/Sports/Caveliananba.png';
import { AppContext } from '../../context/AppContext';

const gearProducts = [
  { id: 1, name: 'City Jersey', price: 30, category: "Football", image: city },
  { id: 2, name: 'White Nike Jersey', price: 110, category: "Football", image: whitenike },
  { id: 3, name: 'Arsenal Jersey', price: 25, category: "Football", image: Arsenal },
  { id: 4, name: 'Blue Basketball Jersey', price: 120, category: "Basketball", image: bluejs },
  { id: 5, name: 'Liverpool Jersey', price: 20, category: "Football", image: Liverpool },
  { id: 6, name: 'Cavs NBA Jersey', price: 140, category: "Basketball", image: Caveliananba },
  { id: 7, name: 'Pink Jersey', price: 90, category: "Football", image: pinkp },
  { id: 8, name: 'Chelsea Jersey', price: 60, category: "Football", image: chelsea },
  { id: 9, name: 'Man U Jersey', price: 45, category: "Football", image: manu },
  { id: 10, name: 'Merc Jersey', price: 50, category: "Football", image: Merc },
  { id: 11, name: 'White Adidas Jersey', price: 100, category: "Football", image: whiteadd },
  { id: 12, name: 'Pink Basketball Jersey', price: 130, category: "Basketball", image: pinkj },
  { id: 13, name: 'Cavs Jersey', price: 80, category: "Basketball", image: Cavs },
];

const Gear = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useContext(AppContext);

  const productsPerPage = 6;

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? gearProducts.filter(product => selectedCategories.includes(product.category))
      : gearProducts;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="shop-container">
      {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)}></div>}

      <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
        <div className="filter-group">
          <h3>Categories</h3>
          {["Football", "Basketball", "Gym", "Outdoor"].map(category => (
            <div className="filter-option" key={category}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />{" "}
                {category}
              </label>
            </div>
          ))}
        </div>
      </aside>

      <div className="main-content">
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
                    alert(`${product.name} added to cart!`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for the selected categories.</p>
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
  );
};

export default Gear;