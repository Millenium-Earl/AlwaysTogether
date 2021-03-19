import io from "socket.io-client";
import React from "react";

const ENDPOINT = 'localhost:5003'


export const socket = io(ENDPOINT);
const SocketContext = React.createContext(socket);
export default SocketContext;
