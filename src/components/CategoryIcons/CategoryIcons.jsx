import React from 'react';
import './CategoryIcons.css';
import { PiDiamond, PiSunglasses, PiHandbag, PiBaseballCap } from 'react-icons/pi';

const shopUrl = '/shop'; 

const categories = [
  { name: 'Jewelry', icon: <PiDiamond /> },
  { name: 'Sunglasses', icon: <PiSunglasses /> },
  { name: 'Bags', icon: <PiHandbag /> },
  { name: 'Hats', icon: <PiBaseballCap /> } 
];

const CategoryIcons = () => {
  return (
    <section className="category-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-icons">
        {categories.map((cat, index) => (
          <a href={shopUrl} key={index} className="category-item">
            <div className="icon-container">
              {cat.icon}
            </div>
            <p className="category-name">{cat.name}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default CategoryIcons;