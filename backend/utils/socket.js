import express from "express";
import { createServer } from "http"
import {Server} from "socket.io"

const app = express();

const server = createServer(app); // Create an HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection",(socket)=>{
    console.log("A new user connected",socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
})

export {app,server}
