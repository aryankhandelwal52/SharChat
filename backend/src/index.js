import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
import messageRoutes from './routes/message.route.js'
import cors from 'cors'
import {app,server} from './lib/socket.js'
dotenv.config()
import path from 'path';


const PORT=process.env.PORT;
const __dirname= path.resolve();
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded data
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));


   app.get(/.*/, (req, res) => {
  res.send('Server running');
});

}
server.listen(PORT,()=>{
    console.log("server is running on PORT :"+ PORT)
    connectDB();
})