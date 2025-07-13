import Admin from '../models/admin.model.js'
import bcrypt from 'bcryptjs'
import { generateAdminToken } from '../utils/generateAdminToken.js'

export const adminLogin = async (req, res) => {
    try{
        const { uid, password } = req.body

        if(!uid || !password) {
            return res.status(400).json({Message : "UID and Password required!"})
        }

        const admin = await Admin.findOne({uid})
        if(!admin) {
            return res.status(404).json({Message : "Invalid credentials!"})
        }

        const isPasswordCorrect = await admin.comparePassword(password) 
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        if(admin) {
            const adminToken = generateAdminToken(admin.uid, admin.name)
            res.cookie('adminJwt', adminToken, {
                maxAge : 3 * 24 * 60 * 60 * 1000,
                httpOnly : true,
                secure : true,
                sameSite : "None"
            })

            return res.status(200).json({
                uid : admin.uid,
                name : admin.name,
            })
        }
    } catch(err) {
        console.log("Error in adminLogin controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const adminLogout = async (req, res) => {
    try {
        res.cookie('adminJwt', '', {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (err) {
        console.log("Error in logout controller", logout)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const getAdminInfo = async (req, res) => {
    try {
        res.status(200).json(req.admin)
    } catch (err) {
        console.log("Error in getAdminInfo controller")
        res.status(500).json({ message: "Internal server error!" })
    }
}
