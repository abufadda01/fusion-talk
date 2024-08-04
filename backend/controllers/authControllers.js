import User from "../models/userModel.js"
import Joi from "joi"
import createError from "../utils/createError.js"



const register = async (req , res , next) => {

    const registerSchema = Joi.object({
        email : Joi.string().email().required() ,
        password : Joi.string().min(8).required() ,
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    const {value , error} = registerSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid Credentials" , 400))
    }

    try {
        
        const {email , password} = value

        const isUserExist = await User.findOne({email})

        if(isUserExist){
            return next(createError("User already exist" , 400))
        }

        const newUser = new User({
            email ,
            password
        })

        await newUser.save()

        const token = newUser.createJWT()

        newUser.password = undefined

        res.cookie("jwt" , token , {
            maxAge : 2 * 24 * 60 * 60 * 1000 ,
            secure : true ,
            sameSite : "None"
        })

        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }

}




const login = async (req , res , next) => {

    const loginSchema = Joi.object({
        email : Joi.string().email().required() ,
        password : Joi.string().min(8).required() ,

    })

    const {value , error} = loginSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid Credentials" , 400))
    }

    try {
        
        const {email , password} = value

        const user = await User.findOne({email}).select("+password")

        if(!user){
            return next(createError("Invalid Credentials" , 400))
        }

        const isPasswordMatch = await user.comparePassword(password , user.password)

        if(!isPasswordMatch){
            return next(createError("Invalid Credentials" , 400))
        }

        const token = user.createJWT()

        user.password = undefined

        res.cookie("jwt" , token , {
            maxAge : 2 * 24 * 60 * 60 * 1000 ,
            secure : true ,
            sameSite : "None"
        })

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }

}




const getUserInfo = async (req , res , next) => {
    try {

        const user = await User.findById(req.userId)
        
        if(!user){
            return next(createError("User not found" , 404))
        }
        
        res.status(200).json(user)

    } catch (error) {
        next(error)        
    }
}




export {register , login , getUserInfo}