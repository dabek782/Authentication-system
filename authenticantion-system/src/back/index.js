import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from './config/db_config.js'
import authRoutes from'./routes/routes.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
connect(process.env.VITE_MongoDB_URI)

app.use('/api/v1/auth' , authRoutes)    

const port = process.env.VITE_Port
app.listen(port, () => console.log(`Server running on port ${port}`))