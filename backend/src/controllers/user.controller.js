import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
const RegisterUser = (async (req, res) => {

    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "user already exists " })
        }

        const user = await User.create({ username, email, password })
        return res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })

    } catch (error) {
        
        console.log("Registration Error:", error); 
        return res.status(500).json({ message: "can not create your account", error: error.message });
    }

})

const loginUser = (async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({ message: "server error" })

    }

})
const logoutUser = (req, res) => {
    
    res.status(200).json({ message: "User logged out successfully" });
};



export {
    RegisterUser,
    loginUser,
    logoutUser
}