import React, { useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../context/AppContext";
import { createOrder } from "../../services/api";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  // ✅ total now accounts for quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity, // ✅ use real quantity
      }));

      const order = await createOrder({ items });

      alert(`✅ Order #${order.id} created! Total: $${order.total}`);
      clearCart();
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
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price} × {item.quantity}
                  </p>
                  {/* ✅ Pass product.id, not index */}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
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
