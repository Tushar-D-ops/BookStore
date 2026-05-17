import express from "express"
import { handleUserLogin, handleAdminLogin, handleUserRegister, handleUserLogout } from "../Controller/user.controller.js"

const userRouter = express.Router()

userRouter.post("/signup", handleUserRegister)
userRouter.post("/signin", handleUserLogin)
userRouter.post("/admin", handleAdminLogin)
userRouter.post("/logout", handleUserLogout)

export default userRouter