import express from 'express'
import { 
    addProduct, 
    getAllProducts, 
    getUserProducts, 
    getProductInfo,
    deleteProduct, 
    updateProduct
} from '../controllers/product.controller.js'

const productsRoutes = express.Router()

productsRoutes.post('/', addProduct)
productsRoutes.get('/', getAllProducts)
productsRoutes.get('/user/:userId', getUserProducts)
productsRoutes.get('/product/:prodId', getProductInfo)
productsRoutes.delete('/product/:prodId', deleteProduct)
productsRoutes.patch('/product/:prodId', updateProduct)

export default productsRoutes