import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { connect } from "mongoose";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config({});
const corsOptions = {
  origin: "http://localhost:5173", // Correct URL with colon
  credentials: true, // Lowercase 'credentials'
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
