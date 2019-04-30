const express = require("express");
const router = express.Router();

//require controllers
const unapprovedUsersController = require("../controllers/api/unapprovedUsers");


//require middleware
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests
router.get("/users/:type", unapprovedUsersController);


module.exports = router;
