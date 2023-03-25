const { loginUser, registerUser, logoutUser } = require("../controllers/Users");

const router = require("express").Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);

module.exports = router;