import prisma from "../client.js"

export const reserveSeat = async (req, res, io) =>{
    const match=await prisma.match.findFirst({
        where:{
            id:req.body.matchid
        },
        include:{
            homeTeam:true,
            awayTeam:true
        }
    })
    if (match==null)
        return res.status(404).json({message:"match id not found"})
    // console.log(req.body)
    const alreadyReserved=await prisma.ticket.findFirst({
        where:{
            row:req.body.row,
            col:req.body.col,
            matchid:req.body.matchid,
            
        }
    })
    if (alreadyReserved)
        return res.status(404).json({message:"seat already reserved"})

    const stadium = await prisma.stadium.findFirst({
        where:{
            id: match.stadiumid
        }
    })
    if (req.body.row > stadium.rows || req.body.col > stadium.cols || req.body.row<0 || req.body.col<0)
        return res.status(404).json({message:"seat not available"})
    const ticket=await prisma.ticket.create({
        data:{
            username: req.body.username,
            matchid:req.body.matchid,
            row:req.body.row,
            col:req.body.col
        }
    })
    const reservedSeatIndex = (req.body.row - 1) * stadium.cols + req.body.col - 1
    io.emit("update-reserved-seats", {matchId: req.body.matchid, seatIndex: reservedSeatIndex});
    return res.status(200).json(ticket)
}

export const getTicketsForUser = async (req, res) => {
    console.log("hola hola")
    console.log(req.user)
    const tickets = await prisma.ticket.findMany(
        {
            where:{
                username: req.user.username,
            },
            include: {
                match: {
                        include: {
                            stadium: true,
                        }
                }
            }
        }
    );
    return res.status(200).json(tickets);
}

export const getReservedTickets = async (req, res) => {
    if (Number.isNaN(req.params.matchId))
        return res.status(500).json({message:"Match ID is not a number"});

    console.log(req.params.matchId)
    const reservedTickets = await prisma.ticket.findMany(
        {
            where:{
                matchid: Number(req.params.matchId),
            }
        }
    );
    return res.status(200).json(reservedTickets);
}

export const cancelTicket = async (req, res) => {
    console.log(req.body)
    try {
        const { row, col, matchid, username } = req.body;

        if (!row || !col || !matchid || !username) {
            return res.status(400).json({ error: "Missing required fields: row, col, matchid, or username." });
        }

        const deletedTicket = await prisma.ticket.delete({
            where: {
                row_col_matchid: {
                    row,
                    col,
                    matchid,
                },
            },
        });

        if (deletedTicket.username !== username) {
            return res.status(403).json({ error: "You can only cancel your own tickets." });
        }

        return res.status(200).json({ message: "Ticket successfully canceled.", ticket: deletedTicket });
    } catch (error) {
        console.error("Error canceling ticket:", error);
        return res.status(500).json({ error: "An error occurred while canceling the ticket." });
    }
};
