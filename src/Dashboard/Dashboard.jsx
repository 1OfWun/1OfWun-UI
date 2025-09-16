import React, { useState } from "react";
import "./Dashboard.css"; // Main dashboard styles
import OverviewPage from "./OverviewPage";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import OrdersPage from "./OrdersPage";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("overview");

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <ProductsPage />;
      case "users":
        return <UsersPage />;
      case "orders":
        return <OrdersPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activePage === "overview" ? "active" : ""}
            onClick={() => setActivePage("overview")}
          >
            📊 Overview
          </li>
          <li
            className={activePage === "products" ? "active" : ""}
            onClick={() => setActivePage("products")}
          >
            📦 Products
          </li>
          <li
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            👥 Users
          </li>
          <li
            className={activePage === "orders" ? "active" : ""}
            onClick={() => setActivePage("orders")}
          >
            🛒 Orders
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderPage()}</main>
    </div>
  );
};

export default Dashboard;