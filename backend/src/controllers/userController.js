import prisma from "../client.js"
import jwt from 'jsonwebtoken';



export const signup = async (req, res) => {

    if (req.body.username == null || req.body.username == "" ||
    req.body.password == null || req.body.password == "" ||
    req.body.firstName == null || req.body.firstName == "" || 
    req.body.lastName == null || req.body.lastName == "" ||
    req.body.gender == null || req.body.gender == "" ||
    req.body.city == null || req.body.city == "" ||
    req.body.email == null || req.body.email == "" || ! req.body.email.includes('@') ||
    req.body.birthDate == null || req.body.birthDate == "" 
)
return res.status(400).json({
    message: "Please provide correct input"
})
    if (await prisma.user.findFirst(
        {
            where: {
                username: req.body.username
            }
        }
    )) {
        res.status(404).json({
            message: "username already in use"
        });
        return;
    }
    if (await prisma.user.findFirst(
        {
            where: {
                email: req.body.email
            }
        }
    )) {
        res.status(404).json({
            message: "email already in use"
        })
        return;
    }
    if (req.body.password != req.body.confirmPassword){
        res.status(404).json({
            message: "passwords don't match"
        })
        return;
    }
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            city: req.body.city,
            email: req.body.email,
            role: "Fan"
        }
    });
    const token = jwt.sign(user, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    if (user) {
        return res.status(200).json({
            jwt: token
        })
    }
    else {
        return res.status(404).json({
            message: "error occured"
        })
    }

}

export const login = async (req, res) => {
    if (req.body.username == null || req.body.username == "" ||
        req.body.password == null || req.body.password == "" 
    )
    return res.status(400).json({
        message: "Please provide correct input"
    })
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    if (!user)
        return res.status(404).json({
            message: "username or password wrong"
        })
    const token = jwt.sign(user, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        jwt: token
    })
}


export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            username: true,
            firstName: true,
            lastName: true,
            birthDate: true,
            gender: true,
            city: true,
            address: true,
            email: true,
            role: true
        }
    })
    return res.status(200).json(
        users
    )
}

export const getUserOwnProfile= async (req, res) =>{
    return res.status(200).json(req.user)
}


export const editProfile = async (req, res) => {
    console.log(req.body)
    if (
        req.body.firstName == null || req.body.firstName == "" || 
        req.body.lastName == null || req.body.lastName == "" ||
        req.body.gender == null || req.body.gender == "" ||
        req.body.city == null || req.body.city == "" ||
        req.body.birthDate == null || req.body.birthDate == "" 
    )
    return res.status(400).json({
        message: "Please provide correct input"
    })
    const user=await prisma.user.findFirst(
        {
            where: {
                username: req.body.username
            }
        }
    )    

    if (!user){
        res.status(404).json({message:"no profile with this username"})
    }

    const newUser=await prisma.user.update({
        where:{
            username:user.username
        },
        data:{
            firstName:req.body.username,
            lastName:req.body.lastName,
            birthDate:req.body.birthDate,
            gender:req.body.gender,
            city:req.body.city,
            address:req.body.address
        }
    })
    const token = jwt.sign(newUser, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        user:newUser,
        jwt:token
    })

}