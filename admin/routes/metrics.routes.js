import express from 'express'
import { getUsers, getVehicles } from '../controllers/metrics.controller.js'

const metricsRoutes = express.Router()

metricsRoutes.get('/userslist', getUsers)
metricsRoutes.get('/vehicleslist', getVehicles)

export default metricsRoutes