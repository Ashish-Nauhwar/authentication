import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import route from "./src/routes/user.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4005

const connectDB = async () => {
    try {
       
        await mongoose.connect(process.env.MONGO_URL)
        console.log("✅ Database connected successfully")
    } catch (error) {
         console.log("Error while connecting mongodb :" , error)       
    }
}

app.use(express.json())
app.use(cors())
app.use("/api/v1/users" , route)

connectDB()

app.listen(PORT , () =>{
    console.log(`server on port : ${PORT}`)
})





// export {app}