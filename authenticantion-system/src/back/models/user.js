import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique: true,
        lowercase : true

    },
    password :{
        type:String,
        required : true,
        minlength : 6
    },
    name :{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
    type:Date,
    default:Date.now
    }
})

UserSchema.pre("save" , async function (next) {
  if(!this.isModified('password')) return 
  this.password = await bcrypt.hash(this.password , 12) 
  next()
})

UserSchema.methods.isValidPassword = async function (pass) {
    try {
        return await bcrypt.compare(pass , this.password)    
    } catch (error) {
        throw error
    }
    
}
const User =  mongoose.model('User' , UserSchema)
export default User
