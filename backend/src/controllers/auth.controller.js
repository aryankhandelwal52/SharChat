import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { protectRoute } from '../middleware/auth.middleware.js';
import cloudinary from '../lib/cloudinary.js';
export const signup=async(req,res)=>{
   const {fullName,email,password}=req.body
   try{
    if(!fullName || !email||!password){
       return res.status(400).json({message:"All fields are required"}); 
    }

    if(password.length<6){
        return res.status(400).json({message:"Password must be ar least 6 character"});
    }
    const user=await User.findOne({email}) // to check if it already exist or not
    if(user) return res.status(400).json({message:"Email already exists"});
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)
const newUser= new User({
    fullName,
    email,
    password:hashedPassword,
})
if(newUser){
    // generate jwt token
    generateToken(newUser._id,res)
    await newUser.save();
    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic,
    })
} 
else{
    return res.status(400).json({message:"Invalid User Data"});
}
   } catch(error){
 console.log("Error in signup controller",error.message);
 res.status(500).json({message:"Internet Server error"});
   }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // 🔁 FIX: `User`, not `user`

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and set cookie
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.log("ERROR IN LOGIN:", error.message);
    res.status(500).json({ message: "Internal Server Error" }); // 🔁 Typo fixed: Internet ➝ Internal
  }
};
export const logout=(req,res)=>{
    try{
res.cookie("jwt","",{maxAge:0});
res.status(200).json({message:"Logged out Successfully"});

    } catch(error){
console.log("Error in logout controller",error.message);
res.status(500).json({message:"Internal Server Error"});
    }
};
export const updateProfile =async(req,res)=>{
try {
    const {profilePic}=req.body;
   const userId= req.user._id; // we add req.user in middleware file like req.user=user;
   if(!profilePic){
    return res.status(400).json({message:"Profile pic is required"});
   }
   
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
   // now we have to update profile
   const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
   res.status(200).json(updatedUser)


} catch (error) {
    console.log("error un updated profile",error)
        return res.status(400).json({message:"Internert Sever error"});

}
} 
//  To keep the user logged in (Auto login check)
//When the user refreshes the page or comes back to your app, your frontend (React, for example) sends a request like:
export const checkAuth=async(req,res)=>{
try {
    res.status(200).json(req.user);

    
} catch (error) {
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message:"Internet Server Error"});
}
}