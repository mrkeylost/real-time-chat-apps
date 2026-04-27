import bcrypt from "bcryptjs";
import userModel from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import cloudinary from "../cloudinary/index.js";

export const signup = async (req, res) => {
  const { email, fullname, password } = req.body;

  if (!email.trim() || !fullname.trim() || !password.trim()) {
    res.json({ message: "All field are required" });
  }

  if (password.length < 6)
    return res.json({ message: "Password must be at least 6 characters" });

  const checkUser = await userModel.findOne({ email });
  if (checkUser) return res.json({ message: "Email already exists" });

  const user = new userModel({
    email,
    fullname,
    password,
  });

  if (user) {
    generateToken(user._id, res);
    await user.save();
    res.json({ message: "Sign Up Successfull", data: user });
  } else {
    res.json({ message: "invalid user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    res.json({ message: "invalid email or password" });
  }

  const checkPassword = await bcrypt.compare(password, findUser.password);
  if (!checkPassword) {
    res.json({ message: "invalid email or password" });
  }

  generateToken(findUser._id, res);
  res.json({ message: "Login successful", data: findUser });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.json({ message: "Logout Successfull" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return res.json({ message: "Profile Pic is required" });
  }

  const uploaderResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      profilePic: uploaderResponse.secure_url,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  res.json({ message: "Update profile success", data: updatedUser });
};

export const checkAuth = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in check auth");
    res.json({ message: "Internal Server Error" });
  }
};
