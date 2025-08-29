import React from 'react'
import "./Featured.css"
import city from '../../assets/Sports/city.png'
import ferrari from '../../assets/Ferrari_jacket.png'
import Memphis from '../../assets/Sports/Memphis.png'
import pinkj from '../../assets/Sports/pinkj.png'
import whitenike from '../../assets/Sports/whitenike.png'
import blackN from '../../assets/Sports/blackN.png'
import bluemanu from '../../assets/Sports/bluemanu.png'

const Featured = () => {

    const products = [
        {name: "City Jersey", price: 30, image: `${city}`},
        {name: "Ferrari Jacket", price: 74, image: `${ferrari}`},
        {name: "Memphis Jersey", price: 30, image: `${Memphis}`},
        {name: "Pink Jersey", price: 30, image: `${pinkj}`},
        {name: "Nike Jersey", price: 30, image: `${whitenike}`},
        {name: "Black Jersey", price: 30, image: `${blackN}`},
        {name: "Manu Jersey", price: 30, image: `${bluemanu}`},
    ]
  return (
    <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-container">
            {products.map((product, index) => (
                <div className="product-card" key={index}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    </div>
  )
}
 
export default Featured