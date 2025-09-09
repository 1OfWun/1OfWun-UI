import React, { useState } from "react";
import "./Dashboard.css";
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
          <li onClick={() => setActivePage("overview")}>📊 Overview</li>
          <li onClick={() => setActivePage("products")}>📦 Products</li>
          <li onClick={() => setActivePage("users")}>👥 Users</li>
          <li onClick={() => setActivePage("orders")}>🛒 Orders</li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderPage()}</main>
    </div>
  );
};

export default Dashboard;
