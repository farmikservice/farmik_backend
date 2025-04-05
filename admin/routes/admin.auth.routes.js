import express from 'express'
import { adminLogin, adminLogout } from '../controllers/auth.admin.controller.js'
import { authenticateAdmin } from '../middlewares/authenticateAdmin.js'

const adminRoutes = express.Router()

adminRoutes.post('/login', adminLogin)
adminRoutes.post('/logout', authenticateAdmin, adminLogout)

export default adminRoutes