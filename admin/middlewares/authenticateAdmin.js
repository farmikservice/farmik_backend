import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'

export const authenticateAdmin = async(req, res, next) => {

    const adminToken = req.cookies.adminJwt
    if(!adminToken) {
        return res.status(401).json({message : "Unauthorized - No token provided"})
    }

    const decodedToken = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET)
    if(!decodedToken) {
        return res.status(401).json({message : "Unauthorized - Invalid token provided."})
    }

    const admin = await Admin.findOne({uid : decodedToken.uid}).select("-password") 
    if(!admin) {
        return res.status(404).json({message : "Admin not found"})
    }

    req.admin = admin

    next()
}