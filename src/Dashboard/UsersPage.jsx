import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  return (
    <div>
      <h1>👥 Users</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>❌ Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
