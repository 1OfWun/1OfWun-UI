import React, { useState } from 'react';
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


const gearProducts = [
  { id: 1, name: 'city', price: 30, image: `${city}` },
  { id: 2, name: 'whitenike', price: 110, image: `${whitenike}` },
  { id: 3, name: 'Arsenal', price: 25, image: `${Arsenal}` },
  { id: 4, name: 'bluejs', price: 120, image: `${bluejs}` },
  { id: 5, name: 'Liverpool', price: 20, image:  `${Liverpool}` },
  { id: 6, name: 'Caveliananba', price: 140, image: `${Caveliananba}` },
  { id: 7, name: 'pinkp', price: 90, image:   `${pinkp}` },
  { id: 8, name: 'chelsea', price: 60, image: `${chelsea}` },
  { id: 9, name: 'manu', price: 45, image:  `${manu}` },
  { id: 10, name: 'Merc', price: 50, image:  `${Merc}` },
  { id: 11, name: 'whiteadd', price: 100, image: `${whiteadd}` },
  { id: 12, name: 'pinkj', price: 130, image: `${pinkj}` },
  { id: 13, name: 'cavs', price: 80, image:  `${Cavs}` },
];

const Gear = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(gearProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = gearProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="shop-container"> 
      <aside className="filters-sidebar">
        <div className="filter-group">
          <h3>Categories</h3>
          <div className="filter-option">
            <label><input type="checkbox" /> Football</label>
          </div>
          <div className="filter-option">
            <label><input type="checkbox" /> Basketball</label>
          </div>
          <div className="filter-option">
            <label><input type="checkbox" /> Gym</label>
          </div>
          <div className="filter-option">
            <label><input type="checkbox" /> Outdoor</label>
          </div>
        </div>
      </aside>

      <div className="main-content"> 
        <section className="products-grid">
          {currentProducts.map(product => (
            <div key={product.id} className="product-card"> 
              <div className="product-image-container"> 
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info"> 
                <h4>{product.name}</h4>
                <p>KSH {product.price}.00</p>
              </div>
            </div>
          ))}
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