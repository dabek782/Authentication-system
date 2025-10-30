import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        // Extract user data from request body
        const {email, password, name} = req.body
        
        // Check if user already exists in database
        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(400).json({message: "User already in db"})
        }
        
        // Create new user (password will be hashed automatically by pre-save middleware)
        const user = await User.create({email, password, name})
        
        // Generate JWT token valid for 2 days
        const userToken = jwt.sign(
            {id: user._id},                    // Payload: user ID
            process.env.VITE_JWT_TOKEN,        // Secret key
            {expiresIn: '2d'}                  // Expiration time
        )
        
        // Send success response with token and user info
        return res.status(201).json({
            userToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error) {
       // Handle any server errors
       return res.status(500).json({message: "Internal error", error: error.message})
    }
}


export const login = async(req, res) => {
    try{
        // Extract login credentials from request body
        const {email, password} = req.body
        
        // Find user by email (MUST use await!)
        const user = await User.findOne({email})
        if(!user){
           return res.status(401).json({message: "Invalid credentials"})
        }
        
        // Compare provided password with hashed password in database
        const isMatching = await user.isValidPassword(password)
        if(!isMatching){
           return res.status(401).json({message: "Invalid credentials"})
        }
        
        // Generate JWT token valid for 2 days
        const token = jwt.sign(
            {id: user._id},                    // Payload: user ID
            process.env.VITE_JWT_TOKEN,        // Secret key
            {expiresIn: '2d'}                  // Expiration time
        )
        
        // Send success response with token and user info
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })
    }
    catch(error){
      // Handle any server errors
      return res.status(500).json({message: "Internal Problem", error: error.message})
    }
}
