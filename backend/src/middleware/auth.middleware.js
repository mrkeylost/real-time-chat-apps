import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ message: "Unauthorized user - No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  if (!decoded) {
    return res.json({ message: "Unauthorized user - invalid token" });
  }

  const user = await userModel.findById(decoded.userId).select("-password");
  if (!user) {
    return res.json({ message: "User not found" });
  }

  req.user = user;
  next();
};
