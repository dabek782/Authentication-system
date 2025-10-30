// Import required packages
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from './config/db_config.js'
import authRoutes from './routes/routes.js'

// Load environment variables from .env file
dotenv.config()

// Initialize Express application
const app = express()

// Middleware setup
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // Parse JSON request bodies

// Connect to MongoDB database
connect(process.env.VITE_MongoDB_URI)

// Register authentication routes (register, login)
// All routes will be prefixed with /api/v1/auth
app.use('/api/v1/auth', authRoutes)    

// Start the server on specified port
const port = process.env.VITE_Port 
app.listen(port, () => console.log(`Server running on port ${port}`))