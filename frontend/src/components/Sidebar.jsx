import React from "react";
import { Link, useNavigate } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import { sidebarMenus } from "./sidebarMenus";

function Sidebar({ setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/auth/login");
  }

  //  Style 
  const dropdownStyle = (extra = {}) => ({
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    ...extra,
  });

  // Get logged-in user role (default admin)
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "admin";



  const menus = sidebarMenus[role] || sidebarMenus.admin;

  return (
    <div
      className="bg-dark text-white vh-100 p-3 mt:2"
      style={{ width: "10vw" }}
    >
      <h4>{role === "doctor" ? "Doctor Panel" : "Admin Panel"}</h4>

      <ul className="nav flex-column">
        {/*Loop through menu items */}
        {menus.map((item, index) =>
          item.dropdown ? (
            <Dropdown key={index} autoClose="outside">
              <Dropdown.Toggle
                style={dropdownStyle()}
                className="link"
                id={`dropdown-${index}`}
              >
                {item.name}
              </Dropdown.Toggle>

              <Dropdown.Menu style={dropdownStyle()} className="link">
                {item.dropdown.map((subItem, subIndex) => (
                  <Dropdown.Item
                    as={Link}
                    to={subItem.path}
                    key={subIndex}
                    style={dropdownStyle()}
                  >
                    {subItem.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link className="link" to={item.path} key={index}>
              {item.name}
            </Link>
          )
        )}

        <button
          onClick={handleLogout}
          className="link btn btn-light"
          style={{
            position: "absolute",
            fontSize: "18px",
            bottom: "50px",
            left: "20px",
          }}
        >
          Logout
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
