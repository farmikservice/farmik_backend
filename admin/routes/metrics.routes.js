import express from 'express'
import { agentList, getOrders, getUsers, getVehicles } from '../controllers/metrics.controller.js'

const metricsRoutes = express.Router()

metricsRoutes.get('/userslist', getUsers)
metricsRoutes.get('/vehicleslist', getVehicles)
metricsRoutes.get('/orderslist', getOrders)
metricsRoutes.get('/agentslist', agentList)

export default metricsRoutes