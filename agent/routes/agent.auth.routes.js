import express from 'express'
import { agentRegister, agentLogin, agentLogout } from '../controllers/agent.auth.controller.js'
import { authenticateAgent } from '../middlewares/authenticateAgent.js'

const agentAuthRoutes = express.Router()

agentAuthRoutes.post('/login', agentLogin)
agentAuthRoutes.post('/register', agentRegister)
agentAuthRoutes.post('/logout', authenticateAgent, agentLogout)

export default agentAuthRoutes