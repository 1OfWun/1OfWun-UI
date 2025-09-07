import React, { useEffect, useState, useContext } from 'react';
import "./Featured.css";
import { getProducts } from '../../services/api';
import { AppContext } from '../../context/AppContext';

const Featured = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    getProducts()
      .then((data) => {
        // Example: only show "Labels" & "Gear" as featured
        const featured = data.filter((p) =>
          ["Labels", "Gear"].includes(p.category)
        );
        setProducts(featured.slice(0, 6)); // show top 6
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>KSH {product.price}.00</p>
              <button
                onClick={() => {
                  addToCart(product);
                  alert("Product added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </div>
  );
};

export default Featured;
