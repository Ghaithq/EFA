import prisma from "../client.js"
import jwt from 'jsonwebtoken';


export const signup=async (req, res) =>{
    if(await prisma.user.findFirst(
        {
            where:{
                username:req.body.username
            }
        }
    ))
    {
        res.status(404).json({
            message:"username already in use"
        });
        return;
    }
    if(await prisma.user.findFirst(
        {
            where:{
                email:req.body.email
            }
        }
    ))
    {
        res.status(404).json({
            message:"email already in use"
        })
        return;
    }
    const user=await prisma.user.create({
        data:{
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            birthDate:req.body.birthDate,
            gender:req.body.gender,
            city:req.body.city,
            email:req.body.email,
            role:"Fan"
        }
    });
    res.status(200).json({
        message:"account created successfully"
    })
    return;
}

export const login=async(req,res)=>{
    const user = await prisma.user.findFirst({
        where:{
            username:req.body.user,
            password:req.body.password
        }
    })
    if(!user)
        return res.status(404).json({
            message:"username or password wrong"
    })
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        jwt:token
    })
}

