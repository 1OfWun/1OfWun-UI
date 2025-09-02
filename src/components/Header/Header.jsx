import React, { useContext, useState } from 'react';
import './Header.css';
import { FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, user} = useContext(AppContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };


  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>
          1<span className='red'>O</span><span className='f'>f</span>Wun
        </Link>
      </div>

      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>Home</Link></li>
          <li className="nav-item"><Link to="/shop" onClick={() => { closeMenu(); closeSearch(); }}>Shop</Link></li>
          <li className="nav-item"><Link to="/gear" onClick={() => { closeMenu(); closeSearch(); }}>Gear</Link></li>
          <li className="nav-item"><Link to="/contact" onClick={() => { closeMenu(); closeSearch(); }}>Contact Us</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <button
            type="button"
            className="search-icon-button"
            onClick={toggleSearch}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
          >
            <FiSearch />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className={`search-input ${isSearchOpen ? 'active' : ''}`}
          />
        </form>

        <div className="account-cart">
            <Link to="/account" className="account-link" onClick={() => { closeMenu(); closeSearch(); }}>
                {user ? `Hi, ${user.name}` : 'Account'}
            </Link>
            <Link to="/account" className="account-icon-link" onClick={() => { closeMenu(); closeSearch(); }}>
                <FiUser />
            </Link>

            <Link to="/cart" className="cart-link" onClick={() => { closeMenu(); closeSearch(); }}>
                <FaShoppingCart />Cart ({cart.length})
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