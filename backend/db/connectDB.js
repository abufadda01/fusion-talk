import mongoose from "mongoose";


const connectDB = async () => {
    return mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("FusionTalk Database connected successfully"))
        .catch((err) => console.log(`Failed in connection to the Database Err : ${err}`))
}


export default connectDB