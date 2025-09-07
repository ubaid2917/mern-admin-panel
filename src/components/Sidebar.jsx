import React from "react";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{width: "220px"}}>
      <h4>Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/" className="nav-link text-white">Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="/users" className="nav-link text-white">Users</a>
        </li>
        <li className="nav-item">
          <a href="/settings" className="nav-link text-white">Settings</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
