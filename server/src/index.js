const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const usersRouter = require("./routes/Users");
const notesRouter = require("./routes/Notes");
const { authenticateSession } = require("./authentication/Auth");

dotenv.config();

const port = 8000;
const sessionSecret = "It's a secret";

mongoose.connect("mongodb+srv://noteTaker:nodetaker@notes.jqd7hpr.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Mongo DB Atlas");
}).catch(err=>{
    console.log("Error in connecting to mongo db atlas);
     console.log(err);
})

const app = express();
app.set('trust proxy', 1)
app.use(cors({
    credentials: true,
    origin: "https://abhi-note-taker-app.netlify.app/"
}))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    cookie: {
        secure: true,
        maxAge: 60*60*1000, // 10 minutes
        sameSite: "none"
    }
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Notes Taker App"
    })
})
app.get("/check", authenticateSession, (req, res) => {
    if(req.user.email===undefined){
        res.status(200).json({
            msg: "Unauthorized"
        })
    }else{
        res.status(200).json({
            msg: "User Authenticated"
        })
    }
})
app.use("/users", usersRouter);
app.use("/notes", authenticateSession, notesRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
