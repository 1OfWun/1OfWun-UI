import React, { createContext, useState, useEffect } from "react";
import * as api from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const me = await api.getMe();
        setUser(me);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const loginUser = async (email, password) => {
    try {
      await api.login(email, password); // saves token
      const me = await api.getMe();
      setUser(me);
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your email and password.");
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      await api.register(username, email, password);
      await loginUser(email, password); // auto login after register
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  const logoutUser = () => {
    api.logout();
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
    <AppContext.Provider
      value={{ user, cart, loginUser, registerUser, logoutUser, addToCart, removeFromCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
