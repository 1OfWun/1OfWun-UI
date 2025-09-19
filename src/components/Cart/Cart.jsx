import React, { useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../context/AppContext";
import { createOrder } from "../../services/api";
import { toast } from "react-toastify"; 

function Cart() {
  const { cart, removeFromCart, clearCart, user } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 const handleCheckout = async () => {
  if (!user) {
    toast.warning("⚠️ Please log in to checkout!");
    return;
  }

  if (cart.length === 0) {
    toast.info("🛒 Your cart is empty");
    return;
  }

  try {
    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderPayload = {
      items,
      total, 
    };

    const order = await createOrder(orderPayload);

    if (!order) {
      toast.error("❌ Failed to create order.");
      return;
    }

    toast.success(`🎉 Order #${order.id} confirmed! Total: KSH ${order.total}`);
    clearCart();
  } catch (err) {
    console.error("Checkout failed:", err);
    toast.error("❌ Checkout failed. Please try again.");
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
