import { useEffect, useState } from "react";
import "./App.css";
import Login from './pages/auth/login'
import Topbar from "./components/Navbar";
import RoutesComp from "./route";
import Sidebar from "./components/Sidebar";
import Message from "./components/Message";
import { Route, Routes } from "react-router";
function App() {

  const [token, setToken] = useState(true)

  return (
    <>
      {
        token === true ? (
          <Routes>

            <Route path="auth">
              <Route path="login" element={<Login />} />

            </Route>
          </Routes>
        ) : (
          <>
            <Topbar />
            <div style={{ display: "flex", gap: "100px" }}>
              <Sidebar />
              <div className="flex-grow-1 p-4" style={{ marginLeft: "220px" }}>
                <RoutesComp />
              </div>
            </div>
            <div>

              <Message />
            </div>
          </>

        )
      }




    </>
  );
}

export default App;
