import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">

      {/* Content area */}
      <div >
        {children}
      </div>
    </div>
  );
}

export default Layout;
