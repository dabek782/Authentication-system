import express from 'express'
import { login, register } from '../controlers/controller.js'

/**
 * Authentication Routes
 * Handles user registration and login endpoints
 */
const router = express.Router()
 
// POST /api/v1/auth/register - Register new user
router.post('/register', register)

// POST /api/v1/auth/login - Login existing user
router.post('/login', login)

export default router