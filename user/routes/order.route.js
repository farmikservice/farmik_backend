import express from 'express'
import { createOrder, getOrders } from '../controllers/order.controller.js'
const orderRoutes = express.Router()

orderRoutes.post('/', createOrder) 
orderRoutes.get('/:id', getOrders) 


export default orderRoutes