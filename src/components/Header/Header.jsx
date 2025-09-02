import React, { useContext, useState } from 'react';
import './Header.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, user} = useContext(AppContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">1<span className='red'>O</span><span className='f'>f</span>Wun</Link>
      </div>
      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/shop">Shop</Link></li>
                    <li className="nav-item"><Link to="/gear">Gear</Link></li>
          <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <form className="search-form">
          <input type="search" name="search" placeholder="Search..." className="search-input" />
        </form>
        <div className="account-cart">
            <Link to="/account" className="account-link">{user ? `Hi, ${user.name}` : 'Account'}</Link>
            <Link to="/cart" className="cart-link">
            <FaShoppingCart />Cart ({cart.length})
            </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Header;