import React from "react";
import { Link, useNavigate } from "react-router";


function Sidebar() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-dark text-white vh-100 p-3 position-fixed"
      style={{ width: "220px" }}
    >
      <h4>Admin Panel</h4>
      <ul className=" nav flex-column ">
        <Link className="link" to={'/'} > 
           Dashboad
        </Link>
        <Link className="link" to={'/users'} > 
           User
        </Link>
        <Link className="link" to={'/product'} > 
           Product 
        </Link>
        <Link className="link" to={'/category'} > 
           Category 
        </Link>
        
        
        
      </ul>
    </div>
  );
}

export default Sidebar;
