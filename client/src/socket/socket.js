import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; 

export const socket = io(SOCKET_SERVER_URL, {
    withCredentials: true,
    autoConnect: false,
})

export const connectSocket = () => {
    if (!socket.connected) {
        socket.connect();
        console.log("socket connected");
    }
};


export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
        console.log("socket disconnected");
    }
};