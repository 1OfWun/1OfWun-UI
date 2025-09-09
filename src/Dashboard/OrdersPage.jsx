import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }

  async function changeStatus(id, newStatus) {
    try {
      await updateOrderStatus(id, newStatus);
      loadOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  }

  return (
    <div>
      <h1>🛒 Orders</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.username}</td>
              <td>KSH {o.total}</td>
              <td>{o.status}</td>
              <td>
                {o.status === "pending" && (
                  <button onClick={() => changeStatus(o.id, "completed")}>
                    ✅ Mark Completed
                  </button>
                )}
                {o.status === "completed" && (
                  <button onClick={() => changeStatus(o.id, "pending")}>
                    🔄 Mark Pending
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
