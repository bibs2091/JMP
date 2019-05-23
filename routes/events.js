const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/events/add");
const validatingController = require("../controllers/events/validating");
const deleteController = require("../controllers/events/delete");
const modifiePostController = require("../controllers/events/modifie_post");
const modifieGetController = require("../controllers/events/modifie_get");
const eventController = require("../controllers/events/eventPage");
const eventGetRegisterController = require("../controllers/events/getRegister");
const eventPostRegisterController = require("../controllers/events/postRegister");
// require middlewares
const isAuthenticated = require("../middleware/isAuthenticated");
const isCoach = require("../middleware/isCoach");
const isEventOwner = require("../middleware/isEventOwner");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrCoach = require("../middleware/isAdminOrCoach");


//handling requests 
router.get("/validating/:id", isAuthenticated, isAdmin, validatingController);
router.post("/delete/:id", isAuthenticated, isEventOwner, deleteController);
router.post("/add", isAuthenticated, addController);
router.post("/modifie/:id", isAuthenticated, isEventOwner, modifiePostController);
router.get("/modifie/:id", isAuthenticated, isEventOwner, modifieGetController);
router.get("/add", isAuthenticated, (req, res) => {
    res.render("events.add");
});
router.get("/:id", isAuthenticated, eventController);
router.get("/register/:id", isAuthenticated, eventGetRegisterController);
router.post("/register/:id", isAuthenticated, eventPostRegisterController);
module.exports = router;
