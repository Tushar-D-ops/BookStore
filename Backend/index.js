import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import connectCloudinary from './config/cloudinary.js';
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"
import nodemailer from "nodemailer"

const app = express();

app.use(cors({
  origin: ['http://localhost:5174','http://localhost:5173','https://book-store-xi-three.vercel.app','https://book-store-admin-two.vercel.app'],
  credentials: true,
}))

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

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `
    });
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(8000,()=>{
    console.log("server started on port 8000")
});