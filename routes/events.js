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


//handling requests 
router.post("/validating/:id",isAdmin,validatingController);
router.post("/delete/:id",isEventOwner,deleteController);
router.post("/add", isAdmin,addController);
router.post("/modifie/:id",isEventOwner,modifiePostController);
router.get("/modifie/:id",isEventOwner,modifieGetController);
router.get("/add",isCoach, (req, res) => {
    res.render("events.add");
});
router.get("/:id",isAuthenticated,eventController);
router.get("/register/:id",isAuthenticated,eventGetRegisterController);
router.post("/register/:id",isAuthenticated,eventPostRegisterController);
module.exports = router;
