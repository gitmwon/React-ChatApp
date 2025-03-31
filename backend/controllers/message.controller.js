import { response } from "express";
import message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, OnlineUsers } from "../utils/socket.js";

export const getUsersForsidebar = async (req, res) => {
  try {
    const loggeduser = req.user._id;
    const Allusers = await User.find({ _id: { $ne: loggeduser } }).select(
      "-password"
    );
    res.status(200).json({ Allusers });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochat } = req.params;
    const myid = req.user._id;
    const userData = await User.findById(userTochat).select("-password");
    //console.log("userdata:",userData)
    const messages = await message.find({
      $or: [
        { sender: myid, reciever: userTochat },
        { sender: userTochat, reciever: myid },
      ],
    });
    res.status(200).json({ messages, userData });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.files;
    const { id: reciever } = req.params;
    const sender = req.user._id;
    let imageurl = [];

    let socketId = OnlineUsers[sender];
    let recieverId = OnlineUsers[reciever];
    const socket = io.sockets.sockets.get(socketId);

    if (image && image.length > 0) {
      for (const img of image) {
        const base64 = `data:${img.mimetype};base64,${img.buffer.toString(
          "base64"
        )}`;
        const responseImg = await cloudinary.uploader.upload(base64);
        imageurl.push(responseImg.secure_url);
      }
    }
    const userData = await User.findById(reciever).select("-password");
    const recvData = await User.findById(sender).select("-password");

    const newMessage = new message({
      sender,
      reciever,
      text,
      image: imageurl,
    });
    //image: imageurl,
    await newMessage.save();
    socket.to(recieverId).emit("messages", newMessage,recvData);
    socket.emit("messages", newMessage,userData);  
    //console.log(userData);
    res.status(200).json({ message: "message delivered" });
  } catch (error) {
    console.log(error);
  }
};

// export const getUserData = async (req,res) =>{
//     try {

//     } catch (error) {
//         console.log(error);
//     }
// }
