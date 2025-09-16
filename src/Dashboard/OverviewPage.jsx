import React, { useEffect, useState } from "react";
import { getProducts, getOrders, getUsers } from "../services/api";
import "./OverviewPage.css";

const OverviewPage = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [products, orders, users] = await Promise.all([
          getProducts(),
          getOrders(),
          getUsers(),
        ]);

        const revenue = orders
          .filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + o.total, 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>📊 Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">Products: {stats.products}</div>
        <div className="stat-card">Orders: {stats.orders}</div>
        <div className="stat-card">Users: {stats.users}</div>
        <div className="stat-card">Revenue: KSH {stats.revenue}</div>
      </div>
    </div>
  );
};

export default OverviewPage;
