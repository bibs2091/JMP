const express = require("express");
const router = express.Router();


//require controllers
const loginController = require("../controllers/auth/login");
const registerController = require("../controllers/auth/register");
const logoutController = require("../controllers/auth/logout");

//handling requests 
router.get("/login", (req, res) => {
    res.send("login page");
});

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", registerController);

module.exports = router;
