import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "Access denied no token!!!" });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(400).json({message: "token is invalid !!!"});
    }

    const user = await User.findById(decoded.id).select("--password");

    if(!user){
        return res.status(400).json({message: "user not found !!!"});
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
  }
};
