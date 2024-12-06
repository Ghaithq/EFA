import prisma from "../client.js"
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
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