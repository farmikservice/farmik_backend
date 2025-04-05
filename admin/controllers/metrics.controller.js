import Product from "../../user/models/product.model.js"
import User from "../../user/models/user.model.js"

export const getUsers = async(req, res) => {
    try {
        const users = await User.find({})
        if(users.length === 0) {
            return res.status(404).json({message : "No users found!"})
        }

        return res.status(200).json({users})

    } catch(err) {
        console.log("Error in getUsers controller", err)
        res.status(500).json({message : "Internal server error!" })
    }
}

export const getVehicles = async(req, res) => {
    try {
        const vehicles = await Product.find({})

        if(vehicles.length === 0) {
            return res.status(404).json({message : "No vehicles to show!"})
        }
        res.status(200).json({vehicles})
    } catch(err) {
        console.log("Error in getVehicles controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}