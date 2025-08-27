import React, { useState } from 'react';
import './Header.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">1<span className='red'>O</span><span className='f'>f</span>Wun</a>
      </div>
      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item"><a href="/">Home</a></li>
          <li className="nav-item"><a href="/shop">Shop</a></li>
          <li className="nav-item dropdown">
            <a href="/categories" className="dropdown-toggle">Categories</a>
            <ul className="dropdown-menu">
              <li><a href="/categories/thrifts">Thrifts</a></li>
              <li><a href="/categories/old-money">Old Money</a></li>
              <li><a href="/categories/labels">Labels</a></li>
            </ul>
          </li>
          <li className="nav-item"><a href="/gear">Gear</a></li>
          <li className="nav-item"><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="header-right">
        <form className="search-form">
          <input type="search" name="search" placeholder="Search..." className="search-input" />
        </form>
        <div className="account-cart">
            <a href="/account" className="account-link">Account</a>
            <a href="/cart" className="cart-link"><span></span><FaShoppingCart />Cart (0) </a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Header;