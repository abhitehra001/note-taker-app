const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";

const authenticateSession = (req, res, next) => {
    try{
        const token = req.session.jwttoken;
        const result = jwt.verify(token, jwtSecretKey);
        if(result){
            req.user = result;
            next();
        }else{
            res.status(200).json({
                msg: "UnAuthorized or Session Expired"
            })
        }
    }catch(e){
        res.status(200).json({
            msg: "UnAuthorized or Session Expired"
        })
    }
}

module.exports = { authenticateSession }