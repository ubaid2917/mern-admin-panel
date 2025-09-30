import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  const showToast = useCallback((message, variant = "success") => {
    // map custom variants to bootstrap colors
    const variantMap = {
      success: "success",
      error: "danger",
      warning: "warning",
      info: "info",
    };

    const bg = variantMap[variant] || "success";

    setToast({ show: true, message, bg });

    // auto hide after 3 sec
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast.show}
          bg={toast.bg}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
