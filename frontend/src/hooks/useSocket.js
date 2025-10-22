import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "../config/config";

const useSocket = (token) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (token) {
      const socket = io(socketUrl, {
        transports: ["websocket"],
        extraHeaders: {
          token: token,
        },
      });

      socketRef.current = socket;

      // cleanup
      return () => {
        socket.disconnect();
      };
    }
  }, [token]);

  return socketRef.current;
};

export default useSocket;
