import mongoose  from 'mongoose'

export const connect = async (uri) =>{
   try {
    await mongoose.connect(uri)
    console.log("connected")
   } catch (error) {
    console.error(error)
    process.exit(1)
   }
}

