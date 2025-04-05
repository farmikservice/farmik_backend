import jwt from 'jsonwebtoken'

export const generateAgentToken = (agentId, agentName) => {
    return jwt.sign({agentId, agentName}, process.env.AGENT_JWT_SECRET, {
        expiresIn : "7d"
    })
}