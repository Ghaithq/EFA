import jwt from 'jsonwebtoken';
import 'dotenv'


export const isLoggedIn=async (req, res) =>{
    const authHeader = req.headers["authorization"]
    const token= authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(404).json({
        message: "no token found"
    })
    await jwt.verify(token,process.env.SECRET,(err,user)=>{
        if (err) return res.status(404).json({
            message: "error"
        })
        req.user=user
        next()
    })
}