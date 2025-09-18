import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Message = ({ message }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const location = useLocation();

  const triggerAlert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
      localStorage.removeItem("showAlert");
    }, 3000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (message) {
      localStorage.setItem("showAlert", message);
      triggerAlert(message);
    }
  }, [message]);

  useEffect(() => {
    const storedAlert = localStorage.getItem("showAlert");
    if (storedAlert) {
      triggerAlert(storedAlert);
    }
  }, [location]);

  return (
    <>
      {showAlert && (
        <div
          style={{
            width: "300px",
            textAlign: "center",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 10000,
          }}
          className="alert alert-success"
        >
          {alertMsg}
        </div>
      )}
    </>
  );
};

export default Message;
