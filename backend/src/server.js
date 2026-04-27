import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import AppError from "./utils/AppError.js";
import { ConnectDB } from "./repository/db.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", UserRouter);
app.use("api/message", MessageRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;

  res.status(status).json({ message });
});

ConnectDB()
  .then(() => {
    app.listen(PORT, () => console.log("Listen port"));
  })
  .catch((e) => {
    console.log("DB Failed", e);
  });
