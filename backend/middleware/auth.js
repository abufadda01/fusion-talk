import createError from "../utils/createError.js"
import jwt from "jsonwebtoken"


const auth = (req , res , next) => {

    try {

        const token = req.cookies.jwt
    
        if(!token){
            return next(createError("You are not authorized" , 401))
        }
    
        jwt.verify(token , process.env.JWT_KEY , async (err , decodedToken) => {

            if(err){
                return next(createError("Access Forbiden" , 403))
            }

            req.userId = decodedToken.userId

            next() 
        })
        
    } catch (error) {
        next(error)   
    }
}



export default auth