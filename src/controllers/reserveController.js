import prisma from "../client.js"

export const reserveSeat = async (req, res) =>{
    const match=await prisma.match.findFirst({
        where:{
            id:req.body.matchid
        },
        include:{
            stadium:true
        }
    })
    if (match==null)
        return res.status(404).json({message:"match id not found"})
    console.log(match)
    const alreadyReserved=await prisma.ticket.findFirst({
        where:{
            row:req.body.row,
            col:req.body.col,
            matchid:req.body.matchid,
            
        }
    })
    if (alreadyReserved)
        return res.status(404).json({message:"seat already reserved"})
    console.log(match.stadium.rows)
    if (req.body.row>match.stadium.rows || req.body.col>match.stadium.cols || req.body.row<0 || req.body.col<0)
        return res.status(404).json({message:"seat not available"})
    const ticket=await prisma.ticket.create({
        data:{
            matchid:req.body.matchid,
            row:req.body.row,
            col:req.body.col
        }
    })
    return res.status(200).json(ticket)

}
