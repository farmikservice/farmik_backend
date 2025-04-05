import jwt from 'jsonwebtoken'

export const generateAdminToken = (uid, name) => {
    return jwt.sign({uid, name}, process.env.ADMIN_JWT_SECRET, {
        expiresIn : "3d"
    })
}
