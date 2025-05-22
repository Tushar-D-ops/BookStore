import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import connectCloudinary from './config/cloudinary.js';
// import noteRouter from "./routes/note.route.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"
// import { authenticateToken } from './utilities.js';

const app = express();
app.use(cors())


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To MongoDB");
})
.catch((err)=>{
    console.log(err)
})

connectCloudinary()

app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)




app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message:message
    })
})





app.listen(8000,()=>{
    console.log("server started on port 8000")
});