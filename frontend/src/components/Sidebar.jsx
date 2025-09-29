import React from "react";
import { Link, useNavigate, } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown'; 
// import './Sidebar.css'


function Sidebar({ setToken }) {

  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null)
    navigate("/auth/login");
  }

  const dropdownStyle = (extra = {}) => ({
    backgroundColor: "transparent",
    border: "none",
    color: "white",
     
    ...extra,
  });


  return (
    <div
      className="bg-dark text-white vh-100 p-3 position-fixed"
      style={{ width: "220px" }}
    >
      <h4>Admin Panel</h4>
      <ul className="nav flex-column">
        <Link className="link" to={'/dashboard'}>
          Dashboard
        </Link>
        <Link className="link" to={'/users/list'}>
          User
        </Link>
        <Link className="link" to={'/patients/list'}>
          Patients
        </Link>
        <Link className="link" to={'/appointments/list'}>
          Appointment
        </Link>
        <Link className="link" to={'/category'}>
          Category
        </Link>

        <Dropdown autoClose="outside">
          <Dropdown.Toggle style={dropdownStyle()} className="link" id="dropdown-basic">
            Doctor Details
          </Dropdown.Toggle>

          <Dropdown.Menu style={dropdownStyle()} className="link">
            <Dropdown.Item as={Link} to="/departments/list"  style={dropdownStyle()} >
              Department List
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/doctors/list"  style={dropdownStyle()}>
              Doctor List
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/something" style={dropdownStyle()}>
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>




        <button
          onClick={handleLogout}
          className="link btn btn-light"
          style={{ position: "absolute", fontSize: "18px", bottom: "50px", left: "20px" }}
        >
          Logout
        </button>
      </ul>

    </div>
  );
}

export default Sidebar;
