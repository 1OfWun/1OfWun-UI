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
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          1<span className='red'>O</span><span className='f'>f</span>Wun
        </Link>
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
        <button className="menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Header;
