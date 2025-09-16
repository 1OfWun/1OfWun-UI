import React, { useEffect, useState, useContext } from 'react';
import "./Featured.css";
import { getProducts } from '../../services/api';
import { AppContext } from '../../context/AppContext';

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const featured = data.filter((p) => p.featured);
        setProducts(featured.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
              <img src={product.image_url || product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>KSH {product.price}.00</p>
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image_url || selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>KSH {selectedProduct.price}</p>
            <div className="modal-actions">
              <button className="add-btn" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;
