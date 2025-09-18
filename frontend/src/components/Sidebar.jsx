import React from "react";
import { Link, useNavigate ,} from "react-router";


function Sidebar({ setToken }) { 
   
  const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem("token");
    setToken(null)
    navigate("/auth/login");
  }

  return (
    <div
      className="bg-dark text-white vh-100 p-3 position-fixed"
      style={{ width: "220px" }}
    >
      <h4>Admin Panel</h4>
      <ul className=" nav flex-column ">
        <Link className="link" to={'/dashboard'} >
          Dashboad
        </Link>
        <Link className="link" to={'/users/list'} >
          User
        </Link>
        <Link className="link" to={'/product'} >
          Product
        </Link>
        <Link className="link" to={'/category'} >
          Category
        </Link>



        <button  onClick={handleLogout}
          className="link btn btn-light"
          style={{ position: "absolute", fontSize: "18px", bottom: "50px", left: "20px" }}
        >Logout</button>





      </ul>
    </div>
  );
}

export default Sidebar;
