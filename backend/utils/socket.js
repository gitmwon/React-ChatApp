import express from "express";
import { createServer } from "http"
import {Server} from "socket.io"

const app = express();

const server = createServer(app); // Create an HTTP server
let OnlineUsers = {}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection",(socket)=>{
    console.log("A new user connected",socket.id);
    const OnlinetUser = socket.handshake.query.userID;
    OnlineUsers[OnlinetUser] = socket.id;
    console.log(OnlineUsers)

    socket.emit("connection",socket.id);

    io.emit("getOnlineUsers",Object.keys(OnlineUsers));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        const disconnectedUser = Object.keys(OnlineUsers).find(userID => OnlineUsers[userID] === socket.id);
        delete OnlineUsers[disconnectedUser];
        io.emit("getOnlineUsers",Object.keys(OnlineUsers));
      });
})

export {app,server,io,OnlineUsers}
