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
const isCoach = require("../middleware/isCoach");



//handling requests 
router.post("/validating/:id",validatingController);
router.post("/delete/:id",deleteController);
router.post("/add", addController);
router.post("/modifie/:id",modifiePostController);
router.get("/modifie/:id",modifieGetController);
router.get("/add",isCoach, (req, res) => {
    res.render("events.add");
});
router.get("/:id",eventController);
router.get("/register/:id",eventGetRegisterController);
router.post("/register/:id",eventPostRegisterController);
module.exports = router;
