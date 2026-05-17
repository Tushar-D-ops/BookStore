import userModel from "../models/userModel.js"
import { errorHandler } from "../utilities.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

const creatToken=(id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}

export const handleUserRegister = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    if (!username || username.length < 3) {
      return next(errorHandler(400,"Username is required or too short"));
    }
    if (!email) {
      return next(errorHandler(400,"Email is required"));
    }
    if (!password) {
      return next(errorHandler(400,"Password is required"));
    }
    if(!validator.isEmail(email)){
      return next(errorHandler(400,"Invalid Email"));
    }
    if(password.length < 6){
      return next(errorHandler(400,"Password must be at least 6 characters long"));
    }

    const existingEmail = await userModel.findOne({ email })
    if (existingEmail) {
      return next(errorHandler(400,"User already exist with this email"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save()

    const token = creatToken(newUser._id)

    res.cookie('token', token, cookieOptions)

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    })
  } catch (error) {
    next(error)
  }
}

const handleUserLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email) {
      return next(errorHandler(400,"Email is required"));
    }
    if(!validator.isEmail(email)){
      return next(errorHandler(400,"Invalid Email"));
    }
    if (!password) {
      return next(errorHandler(400,"Password is required"));
    }
    if(password.length < 6){
      return next(errorHandler(400,"Password must be at least 6 characters long"));
    }

    const existingUser = await userModel.findOne({email})
    if(!existingUser){
      return next(errorHandler(400,"Invalid Credentials"));
    }
    const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password)
    if(!isPasswordCorrect){
      return next(errorHandler(400,"Invalid Credentials"));
    }

    const token = creatToken(existingUser._id)

    res.cookie('token', token, cookieOptions)

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: existingUser,
    })
  } catch (error) {
    next(error)
  }
}

const handleAdminLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email) {
      return next(errorHandler(400,"Email is required"));
    }
    if(!validator.isEmail(email)){
      return next(errorHandler(400,"Invalid Email"));
    }
    if (!password) {
      return next(errorHandler(400,"Password is required"));
    }
    if(password.length < 6){
      return next(errorHandler(400,"Password must be at least 6 characters long"));
    }
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return next(errorHandler(400,"Invalid Credentials"));
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET)

    // Admin token goes in response body only (admin panel handles it separately)
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token: token,
    })
  } catch (error) {
    next(error)
  }
}

const handleUserLogout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  })
  return res.status(200).json({ success: true, message: "Logged out successfully" })
}

export { handleUserLogin, handleAdminLogin,handleUserLogout  }