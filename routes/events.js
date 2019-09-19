const express = require("express");
const router = express.Router();
const UsersInfo = require("../models/UsersInfo");

//require controllers
const addController = require("../controllers/events/add");
const validatingController = require("../controllers/events/validating");
const deleteController = require("../controllers/events/delete");
const modifiePostController = require("../controllers/events/modifie_post");
const modifieGetController = require("../controllers/events/modifie_get");
const eventController = require("../controllers/events/eventPage");
const eventPostRegisterController = require("../controllers/events/postRegister");
const getAllEvents = require('../controllers/events/getAllEvents')
// require middlewares
const isAuthenticated = require("../middleware/isAuthenticated");
const isCoach = require("../middleware/isCoach");
const isEventOwner = require("../middleware/isEventOwner");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrCoach = require("../middleware/isAdminOrCoach");


//handling requests 
router.post("/validating/:id", isAuthenticated, isAdmin, validatingController);
router.post("/delete/:id", isAuthenticated, isEventOwner, deleteController);
router.post("/add", isAuthenticated, addController);
router.post("/modifie/:id", isAuthenticated, isEventOwner, modifiePostController);
router.get("/modifie/:id", isAuthenticated, isEventOwner, modifieGetController);
router.get("/add", isAuthenticated, isAdminOrCoach, async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    res.render("events.add", {
        pageTitle: "add event",
        currentUser
    });
});
router.get("/:id", isAuthenticated, eventController);
router.post("/register/:id", isAuthenticated, eventPostRegisterController);
router.get('/', getAllEvents)
module.exports = router;
