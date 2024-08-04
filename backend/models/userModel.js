import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : [true , "Email is required"] ,
        unique : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "please add a valid email structure"]
    },
    password : {
        type : String ,
        required : true ,
        select : false
    },
    firstName : {
        type : String ,
        required : false
    },
    lastName : {
        type : String ,
        required : false
    },
    image : {
        type : String ,
        required : false
    },
    color : {
        type : Number ,
        required : false
    },
    profileSetup : {
        type : Boolean ,
        default : false
    },
} , {timestamps : true})




userSchema.pre("save" , async function(next) {

    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

    next()
})




userSchema.methods.createJWT = function() {
    return jwt.sign({email : this.email , userId : this._id} , process.env.JWT_KEY , {expiresIn : process.env.JWT_EXPIRE})
}


userSchema.methods.comparePassword = async function(password , savedPassword) {
    return bcrypt.compare(password , savedPassword)
}


const User = mongoose.model("users" , userSchema)


export default User