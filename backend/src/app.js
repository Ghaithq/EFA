import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {
  signup,
  login,
  getAllUsers,
  getUserOwnProfile,
  editProfile
} from "../src/controllers/userController.js";
import { isLoggedIn, isManager } from "../src/middleware/authMiddleware.js";
import { authorize, removeUser } from "../src/controllers/adminController.js";
import { createMatch, editMatch, addStadium } from "../src/controllers/managerController.js";
import {
  getAllMatches,
  getMatchByID,
  getAllStadiums,
  getAllTeams,
  getAllReferees,
  getAllLinesmen
} from "../src/controllers/matchController.js";
import {
  reserveSeat,
  getTicketsForUser,
  getReservedTickets,
  cancelTicket
} from "../src/controllers/reserveController.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  console.log("sanity check");
  res.status(200).send();
});


// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow requests from this origin
      methods: ["GET", "POST"],
    },
  });


app.post("/signup", signup);
app.post("/login", login);
app.get("/get-all-users", getAllUsers);
app.get("/get-profile", isLoggedIn, getUserOwnProfile);
app.post("/edit-profile", isLoggedIn, editProfile);
app.post("/admin/authorize", isLoggedIn, authorize);
app.post("/admin/remove-user", isLoggedIn, removeUser);
app.post("/manager/create-match", isLoggedIn, isManager, createMatch);
app.post("/manager/edit-match", isLoggedIn, isManager, editMatch);
app.post("/manager/add-stadium", isLoggedIn, isManager, addStadium);
app.get("/get-match", getMatchByID);
app.get("/get-all-matches", getAllMatches);
app.get("/get-all-stadiums", getAllStadiums);
app.get("/get-all-teams", getAllTeams);
app.get("/get-all-referees", getAllReferees);
app.get("/get-all-linesmen", getAllLinesmen);
app.get("/get-reserved-tickets/:matchId", getReservedTickets);
app.get("/get-tickets-for-user", isLoggedIn, getTicketsForUser);
app.delete("/cancel-ticket", isLoggedIn, cancelTicket);
app.post("/match/reserve-seats", isLoggedIn, (req, res) => reserveSeat(req, res, io));




io.on("connection", (socket) => {
  console.log("A user connected");

  // io.emit("update-reserved-seats", {});
  // Listen for a seat reservation event
  socket.on("reserveSeat", (data) => {
    console.log("Seat reserved:", data);

    // Broadcast the update to all connected clients
    socket.broadcast.emit("seatReserved", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
