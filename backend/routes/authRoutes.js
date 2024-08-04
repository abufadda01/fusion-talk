import express from "express"
import { register , login, getUserInfo } from "../controllers/authControllers.js"
import auth from "../middleware/auth.js"

const authRoutes = express.Router()


authRoutes.post("/register" , register)

authRoutes.post("/login" , login)

authRoutes.get("/userInfo" , auth , getUserInfo)
 



export default authRoutes