import prisma from "../client.js"

export const createMatch = async (req, res) => {
    const homeTeam = await prisma.team.findUnique({
        where: {
            id: req.body.homeTeamid
        }
    })
    const awayTeam = await prisma.team.findUnique({
        where: {
            id: req.body.awayTeamid
        }
    })
    const referee = await prisma.referee.findUnique({
        where: {
            id: req.body.refereeid
        }
    })
    const linesMan1 = await prisma.linesMan.findUnique({
        where: {
            id: req.body.linesMan1id
        }
    })
    const linesMan2 = await prisma.linesMan.findUnique({
        where: {
            id: req.body.linesMan2id
        }
    })
    const stadium = await prisma.stadium.findFirst({
        where: {
            id: req.body.stadiumid
        }
    })
    // checking if everyone exists
    if (homeTeam == null)
        return res.status(404).json({
            message: "home team id doesn't exist"
        })
    if (awayTeam == null)
        return res.status(404).json({
            message: "away team id doesn't exist"
        })
    if (referee == null)
        return res.status(404).json({
            message: "home referee id doesn't exist"
        })
    if (linesMan1 == null)
        return res.status(404).json({
            message: "away lines man 1 id doesn't exist"
        })
    if (linesMan2 == null)
        return res.status(404).json({
            message: "home lines man 2 id doesn't exist"
        })
    if (stadium == null)
        return res.status(404).json({
            message: "stadium id doesn't exist"
        })

    if (req.body.homeTeamid == req.body.awayTeamid)
        return res.status(404).json({
            message: "team 1 and 2 are the same"
        })
    if (req.body.linesMan1id == req.body.linesMan2id)
        return res.status(404).json({
            message: "lines man 1 and 2 are the same"
        })
    //checking overlapping matches for every one
    const overlappingAwayTeam = await prisma.match.findFirst({
        where: {
            awayTeamid: req.body.awayTeamid,
            date: req.body.date
        }
    })
    const overlappingHomeTeam = await prisma.match.findFirst({
        where: {
            homeTeamid: req.body.homeTeamid,
            date: req.body.date
        }
    })
    const overlappingReferee = await prisma.match.findFirst({
        where: {
            refereeid: req.body.refereeid,
            date: req.body.date
        }
    })
    const overlappingLinesMan1id = await prisma.match.findFirst({
        where: {
            linesMan1id: req.body.linesMan1id,
            date: req.body.date
        }
    })
    const overlappinglinesMan2id = await prisma.match.findFirst({
        where: {
            linesMan2id: req.body.linesMan2id,
            date: req.body.date
        }
    })
    const overlappingStadium = await prisma.match.findFirst({
        where: {
            stadiumid: req.body.stadiumid,
            date: req.body.date
        }
    })
    if (overlappingAwayTeam)
        return res.status(404).json({
            message: "away team got a match at this date"
        })
    if (overlappingHomeTeam)
        return res.status(404).json({
            message: "home team got a match at this date"
        })
    if (overlappingReferee)
        return res.status(404).json({
            message: "referee got a match at this date"
        })
    if (overlappingLinesMan1id)
        return res.status(404).json({
            message: "lines man 1 got a match at this date"
        })
    if (overlappinglinesMan2id)
        return res.status(404).json({
            message: "lines man 2 got a match at this date"
        })
    if (overlappingStadium)
        return res.status(404).json({
            message: "stadium got a match at this date"
        })

    const createdMatch = await prisma.match.create({
        data: {
            homeTeamid: req.body.homeTeamid,
            awayTeamid: req.body.awayTeamid,
            stadiumid: req.body.stadiumid,
            date: req.body.date,
            refereeid: req.body.refereeid,
            linesMan1id: req.body.linesMan1id,
            linesMan2id: req.body.linesMan2id
        }
    })
    return res.status(200).json(
        createdMatch
    )
}


export const editMatch = async (req, res) => {
    const match = await prisma.match.findFirst({
        where: {
            id: req.body.matchid
        }
    })
    const homeTeam = await prisma.team.findUnique({
        where: {
            id: req.body.homeTeamid
        }
    })
    const awayTeam = await prisma.team.findUnique({
        where: {
            id: req.body.awayTeamid
        }
    })
    const referee = await prisma.referee.findUnique({
        where: {
            id: req.body.refereeid
        }
    })
    const linesMan1 = await prisma.linesMan.findUnique({
        where: {
            id: req.body.linesMan1id
        }
    })
    const linesMan2 = await prisma.linesMan.findUnique({
        where: {
            id: req.body.linesMan2id
        }
    })
    const stadium = await prisma.stadium.findFirst({
        where: {
            id: req.body.stadiumid
        }
    })
    // checking if everyone exists
    if (match == null)
        return res.status(404).json({
            message: "match id doesn't exist"
        })
    if (homeTeam == null)
        return res.status(404).json({
            message: "home team id doesn't exist"
        })
    if (awayTeam == null)
        return res.status(404).json({
            message: "away team id doesn't exist"
        })
    if (referee == null)
        return res.status(404).json({
            message: "home referee id doesn't exist"
        })
    if (linesMan1 == null)
        return res.status(404).json({
            message: "away lines man 1 id doesn't exist"
        })
    if (linesMan2 == null)
        return res.status(404).json({
            message: "home lines man 2 id doesn't exist"
        })
    if (stadium == null)
        return res.status(404).json({
            message: "stadium id doesn't exist"
        })

    if (req.body.homeTeamid == req.body.awayTeamid)
        return res.status(404).json({
            message: "team 1 and 2 are the same"
        })
    if (req.body.linesMan1id == req.body.linesMan2id)
        return res.status(404).json({
            message: "lines man 1 and 2 are the same"
        })
    //checking overlapping matches for every one
    const overlappingAwayTeam = await prisma.match.findFirst({
        where: {
            awayTeamid: req.body.awayTeamid,
            date: req.body.date
        }
    })
    const overlappingHomeTeam = await prisma.match.findFirst({
        where: {
            homeTeamid: req.body.homeTeamid,
            date: req.body.date
        }
    })
    const overlappingReferee = await prisma.match.findFirst({
        where: {
            refereeid: req.body.refereeid,
            date: req.body.date
        }
    })
    const overlappingLinesMan1id = await prisma.match.findFirst({
        where: {
            linesMan1id: req.body.linesMan1id,
            date: req.body.date
        }
    })
    const overlappinglinesMan2id = await prisma.match.findFirst({
        where: {
            linesMan2id: req.body.linesMan2id,
            date: req.body.date
        }
    })
    const overlappingStadium = await prisma.match.findFirst({
        where: {
            stadiumid: req.body.stadiumid,
            date: req.body.date
        }
    })
    if (overlappingAwayTeam)
        return res.status(404).json({
            message: "away team got a match at this date"
        })
    if (overlappingHomeTeam)
        return res.status(404).json({
            message: "home team got a match at this date"
        })
    if (overlappingReferee)
        return res.status(404).json({
            message: "referee got a match at this date"
        })
    if (overlappingLinesMan1id)
        return res.status(404).json({
            message: "lines man 1 got a match at this date"
        })
    if (overlappinglinesMan2id)
        return res.status(404).json({
            message: "lines man 2 got a match at this date"
        })
    if (overlappingStadium)
        return res.status(404).json({
            message: "stadium got a match at this date"
        })

    const editedMatch = await prisma.match.update({
        where: {
            id: req.body.matchid
        },
        data: {
            homeTeamid: req.body.homeTeamid,
            awayTeamid: req.body.awayTeamid,
            stadiumid: req.body.stadiumid,
            date: req.body.date,
            refereeid: req.body.refereeid,
            linesMan1id: req.body.linesMan1id,
            linesMan2id: req.body.linesMan2id
        }
    })
    return res.status(200).json(
        editedMatch
    )
}


export const addStadium = async (req, res) =>{
    const createdStadium=await prisma.stadium.create({
        data:{
            name:req.body.name,
            rows:req.body.rows,
            cols:req.body.cols
        }
    })
    return res.status(200).json(createdStadium)
}