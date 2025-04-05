import Product from "../models/product.model.js"
import { authorizeProductAction } from "../utils/authorizeProductAction.js"

export const addProduct = async(req, res) => {
    try {
        const {
            brand, name, area,
            price, image, description,
            pincode, district, tehsil, landmark
        } = req.body

        if( !brand || !name || !area || !price || !image || 
            !description || !pincode || !district || !tehsil || !landmark) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const newProduct = await Product.create({
            ...req.body,
            owner : req.user._id
        })

        if(newProduct) {
            return res.status(200).json({
                product : newProduct,
                message : "Product added successfully!"
            })
        }
    } catch(err) {
        console.log("Error in addProduct controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({})

        if(products.length === 0) {
            return res.status(404).json({message : "No products to show!"})
        }
        res.status(200).json({products})
    } catch(err) {
        console.log("Error in getProducts controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const getUserProducts = async(req, res) => {

    try {
        const {userId} = req.params

        if(!userId){
            return res.status(400).json({message : "User Id is not provided!"})
        }

        const userProducts = await Product.find({owner : userId})
        if(userProducts.length === 0) {
            return res.status(404).json({message : "You have not listed any product!"})
        }

        res.status(200).json({userProducts})

    } catch(err) {
        console.log("Error in getUserProducts controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const getProductInfo = async(req, res) => {
    try {
        const {prodId} = req.params

        if(!prodId) {
            return res.status(400).json({message : "Product ID not provided!"})
        }

        const product = await Product.findById(prodId)
        .populate("owner", "fullName phoneNumber")

        if(!product) {
            return res.status(404).json({message : "Product not found!"})
        }

        res.status(200).json({product})
    } catch(err) {
        console.log("Error in getProductInfo controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const updateProduct = async(req, res) => {
    try {
        const { prodId } = req.params
        const { userId, ...updates } = req.body;

        await authorizeProductAction(userId, prodId)

        const updatedProduct = await Product.findByIdAndUpdate(prodId, updates, {
            new : true,
            runValidators : true,
        })

        res.status(200).json({
            product : updatedProduct,
            message : "Product updated successfully!"
        })
    } catch(err) {
        console.log("Error in updateProduct controller : ", err)
        res.status(err.status || 500).json({ message: err.message || "Internal server error!" });

    }
}

export const deleteProduct = async(req, res) => {
    try {
        const {userId} = req.body
        const {prodId} = req.params

        await authorizeProductAction(userId, prodId)    
        await Product.findByIdAndDelete(prodId)
   
        res.status(200).json({
            deleteProductId : prodId, 
            message : "Product deleted successfully!"
        })
    } catch(err) {
        console.log("Error in deleteProduct controller : ", err)
        res.status(err.status || 500).json({ message: err.message || "Internal server error!" });

    }
}