import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute=async(req,res,next)=>{
    // if jwt token verified succesfully then we can go to change the profile section otherwise error
    try{
const token=req.cookies.jwt
if(!token){
    return res.status(400).json({message:"Unauthorized-No Token Provided"});

}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
if(!decoded){
        return res.status(400).json({message:"Unauthorized-Token Is Invalid"});
}
const user=await User.findById(decoded.userId).select("-password");
if(!user){
     return res.status(400).json({message:"User not found"});
}
req.user=user;
next(); // go to next function


    }catch(error){
console.log("middleware not working",error.message)
     return res.status(400).json({message:"Internet Server"});
    }
}
