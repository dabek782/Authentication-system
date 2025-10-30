import express, { Router } from 'express'
import { login , register } from '../controlers/controller.js'
const app = express()

const router = express.Router()
 
router.post('/register', register)
router.post('/login' , login)

export default router