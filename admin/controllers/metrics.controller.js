import Product from "../../user/models/product.model.js";
import User from "../../user/models/user.model.js";
import Order from "../../user/models/order.model.js";
import Agent from "../../agent/models/agent.model.js";
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found!" })
        }

        return res.status(200).json({ users })

    } catch (err) {
        console.log("Error in getUsers controller", err)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Product.find({})

        if (vehicles.length === 0) {
            return res.status(404).json({ message: "No vehicles to show!" })
        }
        res.status(200).json({ vehicles })
    } catch (err) {
        console.log("Error in getVehicles controller", err)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders to show!" })
        }
        res.status(200).json({ orders })
    } catch (err) {
        console.log("Error in getOrders controller", err)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const agentList = async (req, res) => {
    try {
        const agents = await Agent.find({})
        if (agents.length === 0) {
            return res.status(404).json({ message: "No agents to show!" })
        }
        res.status(200).json({ agents })
    } catch (err) {
        console.log("Error in agentList controller", err)
        res.status(500).json({ message: "Internal server error!" })
    }
}

// Add New Agent 
export const addAgent = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            password,
            identityType,
            identityNumber
        } = req.body

        if (!fullName || !phoneNumber || !email || !password || !identityType || !identityNumber) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        const isAgentAlreadyExist = await Agent.findOne({ identityNumber })
        if (isAgentAlreadyExist) {
            return res.status(409).json({ message: "Agent already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAgent = await Agent.create({ ...req.body, password: hashedPassword })

        if (newAgent) {

            res.status(200).json({
                agentId: newAgent._id,
                name: newAgent.fullName,
                email: newAgent.email,
                phone: newAgent.phoneNumber,
                identityType: newAgent.identityType,
                identityNumber: newAgent.identityNumber
            })
        }

    } catch (err) {
        console.log("Error in addAgent controller", err)
        res.status(500).json({ message: "Internal server error!" })
    }
}
