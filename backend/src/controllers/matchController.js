import prisma from "../client.js"

export const getAllMatches= async (req,res)=>{
    const matches=await prisma.match.findMany({
        include:{
            homeTeam:true,
            awayTeam:true
        }
    })
    return res.status(200).json(matches)
}


export const getMatchByID= async (req,res)=>{

    const match=await prisma.match.findFirst({
        where:{
            id:parseInt(req.query.id)
        }
        
    })
    if (match==null)
        return res.status(404).json({message:"match not found"})
    return res.status(200).json(match)
}