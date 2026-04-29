import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import UserRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import AppError from "./utils/AppError.js";
import { ConnectDB } from "./repository/db.js";
import { app, server } from "./socket/socket.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

app.use("/api/auth", UserRouter);
app.use("/api/message", MessageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;

  res.status(status).json({ message });
});

ConnectDB()
  .then(() => {
    server.listen(PORT, () => console.log("Listen port"));
  })
  .catch((e) => {
    console.log("DB Failed", e);
  });
