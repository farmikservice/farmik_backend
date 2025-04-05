import Agent from "../models/agent.model.js"
import bcrypt from 'bcryptjs'
import { generateAgentToken } from "../utils/generateToken.js"
import { sendCookie } from "../utils/sendCookie.js"

export const agentRegister = async(req, res) => {
    try {
        const {
            fullName, 
            phoneNumber, 
            email, 
            password, 
            identityType, 
            identityNumber 
        } = req.body

        if( !fullName || !phoneNumber || !email || !password || !identityType || !identityNumber ) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const isAgentAlreadyExist = await Agent.findOne({identityNumber})
        if(isAgentAlreadyExist) {
            return res.status(409).json({message : "Agent already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAgent = await Agent.create({...req.body, password : hashedPassword})

        if(newAgent) {
            const agentToken = generateAgentToken(newAgent._id, newAgent.fullName)
            sendCookie(agentToken, res)
            res.status(200).json({
                agentId : newAgent._id,
                name : newAgent.fullName,
                email : newAgent.email,
                phone : newAgent.phoneNumber,
                identityType : newAgent.identityType,
                identityNumber : newAgent.identityNumber
            })
        }

    } catch(err) {
        console.log("Error in agentRegister contoller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}


export const agentLogin = async (req, res) => {
    try{
        const { phoneNumber, password } = req.body

        if(!phoneNumber || !password) {
            return res.status(400).json({Message : "Phone number and password are required!"})
        }

        const agent = await Agent.findOne({phoneNumber})
        if(!agent) {
            return res.status(404).json({Message : "Invalid credentials!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, agent.password) 
        if(!isPasswordCorrect) {
            return res.status(401).json({Message : "Invalid credentials!"})
        }

        if(agent) {
            const agentToken = generateAgentToken(agent._id, agent.fullName)
            sendCookie(agentToken, res)
            res.status(200).json({
                agentId : agent._id,
                name : agent.fullName,
                email : agent.email,
                phone : agent.phoneNumber,
                identityType : agent.identityType,
                identityNumber : agent.identityNumber
            })
        }
    } catch(err) {
        console.log("Error in agentLogin controller", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const agentLogout = (req, res) => {
    try {
        res.cookie('agentJwt', '', {
            maxAge : 0,   
            httpOnly : true,
            secure : true,
            sameSite : "None"
        })
        res.status(200).json({ message: "Logged out successfully!" });
    } catch(err) {
        console.log("Error in logout controller", logout)
        res.status(500).json({message : "Internal server error!"})
    }
}
