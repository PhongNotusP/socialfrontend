import io from "socket.io-client";
let SOCKET_URL = "http://localhost:1234";
export let socket = io.connect(SOCKET_URL);
