import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loginUser = (email, password) => {
    // Simple validation for now
    setUser({ name: email.split('@')[0], email });
  };

  const registerUser = (email, password) => {
    setUser({ name: email.split('@')[0], email });
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <AppContext.Provider value={{ user, cart, loginUser, registerUser, logoutUser, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
};
