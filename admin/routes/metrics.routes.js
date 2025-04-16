import express from 'express'
import { addAgent, addUser, agentList, getOrders, getUsers, getVehicles } from '../controllers/metrics.controller.js'

const metricsRoutes = express.Router()

metricsRoutes.get('/userslist', getUsers)
metricsRoutes.get('/vehicleslist', getVehicles)
metricsRoutes.get('/orderslist', getOrders)
metricsRoutes.get('/agentslist', agentList)
metricsRoutes.post('/add-users', addUser)
metricsRoutes.post('/add-agents', addAgent)

export default metricsRoutes;