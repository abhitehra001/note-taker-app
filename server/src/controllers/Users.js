const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || 10);
const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";

const loginUser = (req, res) => {
    Users.findOne({email: req.body.email}).then(data=>{
        if(data){
            bcrypt.compare(req.body.password, data.password).then(async(result)=>{
                if(result){
                    const token = await jwt.sign({
                        email: data.email,
                        userId: data._id
                    }, jwtSecretKey)
                    req.session.jwttoken = token;
                    res.status(200).json({ msg: "LoggedIn Successfully"});
                }else{
                    res.status(200).json({ msg: "Password Incorrect"});
                }
            }).catch(err => {
                res.status(200).json({ msg: "Password Not Found" });
            })
        }else{
            res.status(200).json({ msg: "Email not Registered"});
        }
    }).catch(err=>{
        res.status(200).json({ msg: "Email not Registered"});
    })
}

const registerUser = (req, res) => {
    Users.findOne({email: req.body.email}).then(data=>{
        if(data){
            res.status(200).json({ msg: "Email Already Registered"})
        }else{
            bcrypt.hash(req.body.password, saltRounds).then(hashedPass => {
                const user = new Users({
                    email: req.body.email,
                    password: hashedPass
                });
                user.save().then((data) => {
                    if (data) {
                        res.status(201).json({ msg: "Registered Successfully" });
                    } else {
                        res.status(200).json({ msg: "Invalid Credentials" })
                    }
                }).catch((err) => {
                    res.status(200).json({ msg: "Email Already Registered" });
                })
            }).catch(err => {
                res.status(200).json({ msg: "Password Not Found" });
            })
        }
    })

}

const logoutUser = (req, res) => {
    req.session.jwttoken = "";
    res.status(200).json({
        msg: "Logged Out Successfully"
    })
}

module.exports = { loginUser, registerUser, logoutUser };