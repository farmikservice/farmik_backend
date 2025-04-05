import Order from "../models/order.model.js"
import User from "../models/user.model.js"

export const createOrder =  async(req, res) => {
    try {

        const { product, orderedBy } = req.body

        if(!product || !orderedBy) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const newOrder = await Order.create(req.body)
        if(newOrder) {
            res.status(200).json({newOrder, message : "Order created successfully!"})
        }
    } catch(err) {
        console.log("Error in createOrder controller", err)
        res.status(500).json({message : "Internal server error!"})

    }
}

export const getOrders = async(req, res) => {
    try {

        const userId  = req.params.id
        if(!userId) {
            return res.status(200).json({message : "User ID is required!"})
        }

        const isUserExists = await User.findById(userId)
        if(!isUserExists) {
            return res.status(404).json({message : "User not found!"})
        }

        const userOrders = await Order.find({orderedBy : userId})
        .select('-orderedBy')
        .populate('product', 'name image')

        if(userOrders.length === 0) {
            return res.status(200).json({message : "No orders found!"})
        }

        res.status(200).json({userOrders})


    } catch(err) {
        console.log("Error in getOrders controller", err) 
        res.status(500).json({message : "Internal server errror!"})
    }
}