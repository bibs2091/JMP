const express = require("express");
const router = express.Router();


//require controllers
const loginController = require("../controllers/auth/login");
const registerController = require("../controllers/auth/register");
const logoutController = require("../controllers/auth/logout");

//handling requests 
router.get("/login", (req, res) => {
    //rendering the login page with success msg 
    res.render('login',{
    	msg : req.flash('success')
    });
});

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", registerController);

module.exports = router;
