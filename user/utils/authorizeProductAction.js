import Product from "../models/product.model.js";

export const authorizeProductAction = async (userId, prodId) => {
    if (!prodId || !userId) {
        throw { status: 400, message: "Product ID and User ID are required!" };
    }

    const product = await Product.findById(prodId);
    if (!product) {
        throw { status: 404, message: "Product not found!" };
    }

    if (product.owner.toString() !== userId) {
        throw { status: 403, message: "You are not authorized to access this product!" };
    }
};
