import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

/**
 * User Schema Definition
 * Defines the structure of user documents in MongoDB
 */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Email is mandatory
        unique: true,   // No duplicate emails allowed
        lowercase: true // Convert to lowercase before saving
    },
    password: {
        type: String,
        required: true,  // Password is mandatory
        minlength: 6     // Minimum 6 characters
    },
    name: {
        type: String,
        required: true,  // Name is mandatory
        unique: true     // No duplicate names allowed
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set creation timestamp
    }
})

/**
 * Pre-save middleware: Hash password before saving to database
 * Only hashes if password is new or modified
 */
UserSchema.pre("save", async function (next) {
  // Check if password was modified
  if(!this.isModified('password')) return next()
  
  // Hash password with salt rounds of 12
  this.password = await bcrypt.hash(this.password, 12) 
  next()
})


UserSchema.methods.isValidPassword = async function (pass) {
    try {
        // Compare plain text with hashed password
        return await bcrypt.compare(pass, this.password)    
    } catch (error) {
        throw error
    }
}

// Create and export User model
const User = mongoose.model('User', UserSchema)
export default User
