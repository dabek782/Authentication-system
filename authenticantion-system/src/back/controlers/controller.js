import User from "../models/User.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path:'../.env'})

export const register = async (req, res) =>{
    try {
        const {email , password , name} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(400).json({message: "User already in db"})
        }
        const user = await User.create({email , password ,name })
        const userToken = jwt.sign({id : user._id} , process.env.VITE_JWT_TOKEN , {expiresIn:'2d' })
        return  res.status(201).json({userToken ,user: {id:user._id , email:user.email, name:user.name }})

    } catch (error) {
       return res.status(500).json({message:"Internal error" , error:error.message})
    }
}

export const login = async(req , res)=>{
    try{
        const  {email , password , name} = req.body
        const user = User.findOne({email})
        if(!user){
           return res.status(401).json({message:"Did not find user with that email"})
        }
        const isMatching = await user.isValidPassword(password)
        if(!isMatching){
           return res.status(401).json({message:"Wrong Credentials"})
        }
        const token = jwt.sign({id:user._id} , process.env.VITE_JWT_TOKEN , {expiresIn:'2d'})
        return res.status(200).json({token , user:{id:user._id , email: user.email , name : user.name}})
    }
    catch(error){
      return  res.status(500).json({message:"Internal Problem", error:error.message})
    }
}
