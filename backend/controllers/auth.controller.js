import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { email, fullname, password, profilePic,about } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: "user aldready exist in database" });
    }
    const hashedpass = await bcrypt.hash(password, 6);
    const newUser = new User({
      email,
      fullname,
      password: hashedpass,
      profilePic,
      about,
    });

    newUser.save();

    if(newUser){
      const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});

      res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_DEV != "development",
      });
    }

    res.status(200).json({ message: "User created succesfully",data:newUser});
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const Match = await bcrypt.compare(password, user.password);
      if (!Match) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

      res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_DEV != "development",
      });

        res.status(200).json({ message: "user logged in succesfully",data:user });
    }else{
        return res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logged out succesfully"});
  } catch (error) {
    console.log(error)
  }
};

export const updateProfile = async (req,res) =>{
    try{
      const profilePic = req.file;
      const id = req.user._id;
      if(!profilePic){
        return res.status(400).json({message:"no profile pic selected"});
      }
      const base64 = `data:${profilePic.mimetype};base64,${profilePic.buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64);
      const userPic = await User.findByIdAndUpdate(id,{profilePic:uploadRes.secure_url},{new:true});
      res.status(200).json({userPic});
    }catch(error){
      console.log(error);
    }   
}

export const updateUserData = async(req,res)=>{
  try {
    const {fullname,about} = req.body;
    const id = req.user._id;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {fullname,about},
      {new:true}
    )
    if(!updateUser){
      return res.status(500).json({message:"User not found"});
    }
    res.status(200).json({message:"user data updated",data:updateUser});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const checkuser = async (req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
} 