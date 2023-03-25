const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecretKey = "It's a Secret";

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