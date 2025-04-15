import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import authRoutes from './user/routes/auth.routes.js'
import connectToDB from './user/utils/connectToDB.js'
import productsRoutes from './user/routes/product.routes.js'
import { verifyToken } from './user/middlewares/authMiddleware.js'
import adminAuthRoutes from './admin/routes/admin.auth.routes.js'
import { authenticateAdmin } from './admin/middlewares/authenticateAdmin.js'
import metricsRoutes from './admin/routes/metrics.routes.js'
import agentAuthRoutes from './agent/routes/agent.auth.routes.js'
import orderRoutes from './user/routes/order.route.js'

const app = express()
dotenv.config()

const clorsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors(clorsOption))

// User routes
app.use('/api/auth', authRoutes)
app.use('/api/products',verifyToken, productsRoutes)
app.use('/api/orders', verifyToken, orderRoutes)

// Admin routes
app.use('/api/auth/admin', adminAuthRoutes)
app.use('/api/admin', authenticateAdmin, metricsRoutes)

// Agent routes
app.use('/api/auth/agent', agentAuthRoutes)

app.listen(process.env.PORT, async() => {
    connectToDB()
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log("Error in connecting DB", err))
    console.log(`Server is listening at PORT : ${process.env.PORT}`)
})