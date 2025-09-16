import React, { createContext, useState, useEffect } from "react";
import * as api from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState([]); // ✅ cart state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await api.getMe();
        setUser(me);
      } catch (err) {
        console.log("No logged-in user");
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ AUTH FUNCTIONS
  const loginUser = async (email, password) => {
    try {
      const token = await api.login(email, password);
      const me = await api.getMe();
      setUser(me);
      return me;
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check your email and password.");
      return null;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await api.register(username, email, password);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        api.setAuthToken(data.access_token);
        const me = await api.getMe();
        setUser(me);
        return me;
      }

      return data;
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
      return null;
    }
  };

  const logoutUser = () => {
    api.logout();
    setUser(null);
  };

  // ✅ CART FUNCTIONS
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        // update quantity
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

const removeFromCart = (productId) => {
  setCart((prev) => prev.filter((p) => p.id !== productId));
};

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        loginUser,
        registerUser,
        logoutUser,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
