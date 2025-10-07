import React, { useContext, useState } from 'react';
import './Header.css';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, user } = useContext(AppContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top"> 
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            1<span className='red'>O</span><span className='f'>f</span>Wun
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li className="nav-item"><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
          <li className="nav-item"><Link to="/gear" onClick={closeMenu}>Gear</Link></li>
          <li className="nav-item"><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        <div className="number">
          <a href="tel:+254720802853">+254 720 802 853</a>
          <span className="separator">/</span>
          <a href="tel:+254745802854">+254 745 802 854</a>
        </div>

        <div className="account-cart">
          <Link to="/account" className="account-link" onClick={closeMenu}>
            {user ? `Hi, ${user.username || user.email.split('@')[0]}` : 'Account'}
          </Link>
          <Link to="/account" className="account-icon-link" onClick={closeMenu}>
            <FiUser />
          </Link>
          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            <FaShoppingCart />Cart ({cart?.length || 0})
          </Link>
        </div>
      </div>
    </header>
  );
}


export default Header;