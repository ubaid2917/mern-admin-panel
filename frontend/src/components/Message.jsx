import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Message = ({ message, variant = "success" }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const location = useLocation();

  const triggerAlert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
      localStorage.removeItem("showAlert");
      localStorage.removeItem("variant");
    }, 3000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (message) {
      localStorage.setItem("showAlert", message);
      localStorage.setItem("variant", variant);
      triggerAlert(message);
    }
  }, [message, variant]);

  useEffect(() => {
    const storedAlert = localStorage.getItem("showAlert");
    const storedVariant = localStorage.getItem("variant");
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
          className={`alert alert-${variant}`}
        >
          {alertMsg}
        </div>
      )}
    </>
  );
};

export default Message;
