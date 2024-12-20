import prisma from "../client.js"

//username is provided
export const authorize = async (req, res) => {
    if (req.user.role != 'Admin')
        return res.status(400).json({
            message: "you are not authorized"
        })
    if (req.body.username == null || req.body.username == "")
        return res.status(400).json({
            message: "Please provide correct input"
        })
    let userToAuthorize = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })
    if (userToAuthorize == null)
        return res.status(400).json({
            message: "user doesn't exist"
        })
    let authorizedUser = await prisma.user.update({
        where: {
            username: req.body.username
        },
        data: {
            role: "Manager"
        }
    })
    if (authorizedUser) {
        return res.status(200).json({
            message: "user authorized successfully"
        })
    }
    else {
        return res.status(400).json({
            message: "error occured"
        })
    }
}


//username is provided
export const removeUser = async (req, res) => {
    if (req.user.role != 'Admin')
        return res.status(400).json({
            message: "you are not authorized"
        })
    if (req.body.username == null || req.body.username == "")
        return res.status(400).json({
            message: "Please provide correct input"
        })
    let userToDelete = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })
    if (userToDelete == null)
        return res.status(400).json({
            message: "user doesn't exist"
        })
    await prisma.ticket.deleteMany({
        where: {
            username: userToDelete.username
        },
    });

    let deletedUser = await prisma.user.delete({
        where: {
            username: req.body.username
        },
    })
    if (deletedUser) {
        return res.status(200).json({
            message: "user deleted successfully"
        })
    }
    else {
        return res.status(400).json({
            message: "error occured"
        })
    }
}