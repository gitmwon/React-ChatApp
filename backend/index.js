import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {app,server} from "./utils/socket.js"

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.get('/',(req,res)=>{
    res.send("hello")
});

app.use('/api/auth/',authRoutes)
app.use('/api/messages/',messageRoutes)

server.listen(8080,async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('server running on port 8080');
    } catch (error) {
        console.log(`error ${error}`);
    }
})

