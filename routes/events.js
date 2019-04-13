const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/events/add");
const validatingController = require("../controllers/events/validating");
const deleteController = require("../controllers/events/delete");
//handling requests 
router.post("/validating/:id",validatingController);
router.post("/delete/:id",deleteController);
router.post("/add", addController);
router.get("/add", (req, res) => {
    res.render("events.add");
});

module.exports = router;
