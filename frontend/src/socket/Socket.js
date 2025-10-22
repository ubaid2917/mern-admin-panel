import { socketUrl } from "../config/config";
import { io } from "socket.io-client";

let socket; 
export const connectSocket = (token) => {
    socket = io(socketUrl, {
        transports: ["websocket"],
        auth: {
            token: token
        }
    })
} 

export const getSocket = () =>  socket;