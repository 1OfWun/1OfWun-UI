import React from 'react';
import './Footer.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">1OfWun</h3>
          <p className="footer-about">Affordable and stylish fashion for your unique style.</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/the.1ofwun/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@the.1ofwun" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Newsletter</h3>
          <p>Subscribe to our newsletter for the latest updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} 1OfWun. All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;