import express from "express";
import { signup, login, getAllUsers,getUserOwnProfile,editProfile } from "../src/controllers/userController.js"
import { isLoggedIn, isManager } from "../src/middleware/authMiddleware.js";
import { authorize, removeUser } from "../src/controllers/adminController.js"
import { createMatch ,editMatch,addStadium} from "../src/controllers/managerController.js"
import { getAllMatches,getMatchByID} from "../src/controllers/matchController.js"
import {reserveSeat} from "../src/controllers/reserveController.js"
import cors from "cors"
const app = express();
app.use(express.json());
// const corsOrigin ={
//     origin:'http://localhost:5173', //or whatever port your frontend is using
//     credentials:true,            
//     optionSuccessStatus:200
// }
app.use(cors());



app.get("/", async (req, res) => {
    console.log("sanity check");
    res.status(200).send();
})

app.post("/signup", signup)
app.post("/login", login)
app.get("/get-all-users", getAllUsers)
app.get("/get-profile",isLoggedIn, getUserOwnProfile)
app.post("/edit-profile",isLoggedIn, editProfile)
app.post("/admin/authorize", isLoggedIn, authorize)
app.post("/admin/remove-user", isLoggedIn, removeUser)
app.post("/manager/create-match", isLoggedIn, isManager, createMatch)
app.post("/manager/edit-match", isLoggedIn, isManager, editMatch)
app.post("/manager/add-stadium", isLoggedIn, isManager, addStadium)
app.get("/get-match", getMatchByID)
app.get("/get-all-matches", getAllMatches)
app.post("/match/reserve-seat", isLoggedIn, reserveSeat)

app.listen(3000)
export default app;