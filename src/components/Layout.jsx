import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      {/* Content area */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "220px" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
