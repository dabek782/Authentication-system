import mongoose from 'mongoose'


export const connect = async (uri) => {
   try {
    // Attempt to connect to MongoDB
    await mongoose.connect(uri)
    console.log("MongoDB connected successfully")
   } catch (error) {
    // Log error and exit process if connection fails
    console.error("MongoDB connection error:", error)
    process.exit(1) // Exit with failure code
   }
}

