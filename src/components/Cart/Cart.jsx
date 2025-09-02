import React, { useContext } from 'react'
import './Cart.css'
import {AppContext} from '../../context/AppContext'

const Cart = () => {
    const {cart, removeFromCart } = useContext(AppContext);


    const total = cart.reduce((sum, item ) => sum + item.price, 0);
    
    
  return (
    <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>Your Cart Is empty</p> : (
            <>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h4>{item.name}</h4>
                            <p>${item.price}</p>
                            <button onClick={() => removeFromCart(index)}>Remove</button>
                        </div>
                    </li>
                ))} 
            </ul>
            <h3>Total: ${total} </h3>      
            </>
        )}
    </div>
  )
}

export default Cart