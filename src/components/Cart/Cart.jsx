import React, { useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../context/AppContext";
import { createOrder } from "../../services/api"; // 👈 import API

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      // Convert cart items to backend format
      const items = cart.map((item) => ({
        product_id: item.id,     // must match your backend
        quantity: 1,             // default quantity = 1
      }));

      const order = await createOrder({ items });

      alert(`✅ Order #${order.id} created! Total: $${order.total}`);
      clearCart(); // empty the cart after checkout
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("❌ Checkout failed, check console.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
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

          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            🛒 Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
