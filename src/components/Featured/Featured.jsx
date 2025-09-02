import React, { useContext } from 'react';
import "./Featured.css";
import city from '../../assets/Sports/city.png';
import ferrari from '../../assets/Ferrari_jacket.png';
import Memphis from '../../assets/Sports/Memphis.png';
import pinkj from '../../assets/Sports/pinkj.png';
import whitenike from '../../assets/Sports/whitenike.png';
import blackN from '../../assets/Sports/blackN.png';
import bluemanu from '../../assets/Sports/bluemanu.png';
import { AppContext } from '../../context/AppContext';

const Featured = () => {
    const products = [
        { name: "City Jersey", price: 30, category: "Gear", image: city },
        { name: "Ferrari Jacket", price: 74, category: "Labels", image: ferrari },
        { name: "Memphis Jersey", price: 30, category: "Gear", image: Memphis },
        { name: "Pink Jersey", price: 30, category: "Gear", image: pinkj },
        { name: "Nike Jersey", price: 30, category: "Gear", image: whitenike },
        { name: "Black Jersey", price: 30, category: "Gear", image: blackN }, // Fixed typo "Gaer"
        { name: "Manu Jersey", price: 30, category: "Gear", image: bluemanu },
    ];

    const { addToCart } = useContext(AppContext);

    return (
        <div className="featured-products">
            <h2>Featured Products</h2>
            <div className="products-container">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img src={product.image} alt={product.name} />
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
                ))}
            </div>
        </div>
    );
};

export default Featured;
