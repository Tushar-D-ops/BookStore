import express from "express"
import { handleUserLogin, handleAdminLogin, handleUserRegister } from "../Controller/user.controller.js"


const userRouter = express.Router()

userRouter.post("/signup", handleUserRegister)
userRouter.post("/signin", handleUserLogin)
userRouter.post("/admin", handleAdminLogin)

// router.get("/signout", authenticateToken, signout)

export default userRouter