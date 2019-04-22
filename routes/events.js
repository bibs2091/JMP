const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/events/add");

//handling requests 
router.post("/add", addController);
router.get("/:id", (req, res) => {
    res.render("events.event");
})

module.exports = router;
