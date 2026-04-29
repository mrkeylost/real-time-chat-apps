import userModel from "../models/User.js";
import messageModel from "../models/Message.js";
import cloudinary from "../cloudinary/index.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getUserSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUser = await userModel
    .find({ _id: { $ne: loggedInUserId } })
    .select("-password");

  res.json({ message: "Get All User Success", data: filteredUser });
};

export const getMessage = async (req, res) => {
  const { id } = req.params;
  const senderId = req.user._id;

  const messages = await messageModel.find({
    $or: [
      { senderId: senderId, receiverId: id },
      { senderId: id, receiverId: senderId },
    ],
  });

  res.json({ message: "Chat success", data: messages });
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id } = req.params;
  const senderId = req.user._id;

  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new messageModel({
    senderId,
    receiverId: id,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(id);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.json({ message: "send message success", data: newMessage });
};
