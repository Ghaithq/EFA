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


export const getAllStadiums = async (req,res) => {
    const stadiums = await prisma.stadium.findMany();
    return res.status(200).json(stadiums);
}

export const getAllTeams = async (req, res) => {
    const teams = await prisma.team.findMany();
    return res.status(200).json(teams);
}

export const getAllReferees = async (req, res) => {
    const referees = await prisma.referee.findMany();
    return res.status(200).json(referees);
}

export const getAllLinesmen = async (req, res) => {
    const linesmen = await prisma.linesMan.findMany();
    return res.status(200).json(linesmen);
}