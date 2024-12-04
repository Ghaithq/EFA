import express from "express";
import {signup,login} from "../src/controllers/userController.js"
import { isLoggedIn } from "../src/middleware/authMiddleware.js";
const app=express();
app.use(express.json());


app.get("/",isLoggedIn,async (req, res) =>{
    console.log("sanity check");
    res.status(200).send();
})

app.post("/signup",signup)
app.post("/login",login)

app.listen(3000)
export default app;