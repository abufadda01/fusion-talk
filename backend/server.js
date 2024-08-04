import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/connectDB.js"
import errorHandler from "./middleware/errorHandler.js"
import morgan from "morgan"
import authRoutes from "./routes/authRoutes.js"

dotenv.config({path : "./.env"})


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: process.env.ORIGIN , credentials: true}))

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}



// ROUTES
app.use("/api/auth" , authRoutes)



app.use(errorHandler)


const PORT = process.env.PORT

const start = async () => {
    try {
        app.listen(PORT , console.log(`FusionTalk server started on port ${PORT}`))
        await connectDB()
    } catch (error) {
        console.log(error)
    }
}


start()