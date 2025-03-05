import { response } from 'express';
import message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getUsersForsidebar = async (req,res) => {
    try {
        const loggeduser = req.user._id;
        const Allusers = await User.find({_id:{$ne: loggeduser}}).select("-password");
        res.status(200).json({Allusers});
    } catch (error) {
        console.log(error);
    }
}

export const getMessages = async (req,res) =>{
    try {
        const {id: userTochat} = req.params;
        const myid = req.user._id;
        const userData = await User.findById(userTochat).select("-password");
        const messages = await message.find({$or:[
            {sender:myid,  reciever:userTochat},
            {sender:userTochat,  reciever:myid},
        ]});
        res.status(200).json({messages,userData});
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = async (req,res) =>{
    try {
        const {text,image} = req.body;
        const {id: reciever} = req.params;
        const sender = req.user._id;
        let imageurl;

        if(image){
            const responseImg = await cloudinary.uploader.upload(image);
            imageurl = responseImg.secure_url;
        }

        const newMessage = new message({
            sender,
            reciever,
            text,
            image: imageurl,
    })

    await newMessage.save();
    res.status(200).json({message:"message delivered"});

    } catch (error) {
        console.log(error)
    }
}

// export const getUserData = async (req,res) =>{
//     try {
        
//     } catch (error) {
//         console.log(error);
//     }
// }