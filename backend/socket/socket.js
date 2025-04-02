import express from "express";
// import { createServer } from "http";
import http from 'http'
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
// console.log(server);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});
// console.log(io);

// console.log("socket server is running");
const userSocket = {}
export const getRecievedSocketId = (userId) => {
    return userSocket[userId];
}
io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocket[userId] = socket.id
    }
    io.emit("getOnlineUsers", Object.keys(userSocket));
    // console.log("a new client connected");
    socket.on("disconnect", () => {
        delete userSocket[userId]
        io.emit("getOnlineUsers", Object.keys(userSocket));
        // console.log("a client disconnected");
    })
});
export { app, io, server };
