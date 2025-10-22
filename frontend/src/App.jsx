import { useEffect, useState } from "react";
import "./App.css";
import Login from './pages/auth/login'
import Topbar from "./components/Navbar";
import RoutesComp from "./route";
import Sidebar from "./components/Sidebar";
import Message from "./components/Message";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import useSocket from "./hooks/useSocket";
import { connectSocket, getSocket } from "./socket/Socket";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      connectSocket(token);
      const socket = getSocket();

      socket.on('welcome', (message) => {
        console.log(message);
      })

    } else {
      localStorage.removeItem("token");

      navigate("/auth/login",)
      return () => {
        const socket = getSocket();
        if (socket) {
          socket.disconnect();
        }
      }

    }

  }, [token])

  return (
    <>
      {
        !token ? (
          <Routes>

            <Route path="auth">
              <Route path="login" element={<Login setToken={setToken} />} />

            </Route>
          </Routes>
        ) : (
          <>

            <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
              <div style={{ width: "10vw", }}>
                <Sidebar setToken={setToken} />
              </div>
              <div className="flex-grow-1" style={{ width: "90vw", overflow: "hidden" }}>
                <Topbar />
                <div className="p-4">
                  <RoutesComp />
                </div>
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
