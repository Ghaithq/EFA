import jwt from 'jsonwebtoken';
import 'dotenv'

export const isLoggedIn = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(404).json({
        message: "no token found"
    })
    await jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                message: "error"
            })
        }
        req.user = user
        next()
    })
}


export const isManager = async (req, res, next) => {
    if (req.user.role != "Manager")
        return res.status(404).json({
            message: "not authorized"
        })
    next()
}