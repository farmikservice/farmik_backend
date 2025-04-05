import jwt from 'jsonwebtoken'
import Agent from '../models/agent.model.js'

export const authenticateAgent = async(req, res, next) => {

    const agentToken = req.cookies.agentJwt
    if(!agentToken) {
        return res.status(401).json({message : "Unauthorized - No token provided"})
    }

    const decodedToken = jwt.verify(agentToken, process.env.AGENT_JWT_SECRET)
    console.log(decodedToken)
    if(!decodedToken) {
        return res.status(401).json({message : "Unauthorized - Invalid token provided."})
    }

    const agent = await Agent.findById(decodedToken.agentId)
    .select("-password") 

    if(!agent) {
        return res.status(404).json({message : "Agent not found"})
    }

    req.agent = agent

    next()
}