import {Router} from "express"
import User from "../models/user.model.js"
import {RegisterUser , loginUser , logoutUser} from "../controllers/user.controller.js"
import { protect } from "../middleware/user.middleware.js"


const route = Router()

route.post("/register-user" , RegisterUser)
route.post("/login-user" , loginUser)

route.get("/profile", protect, (req, res) => {
    res.json({ message: "Welcome to your private profile", user: req.user });
   
route.post("/logout", logoutUser);
})

export default route;