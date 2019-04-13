const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/events/add");
const validatingController = require("../controllers/events/validating");
//handling requests 
router.post("/validating/:id",validatingController);

router.post("/add", addController);
router.get("/add", (req, res) => {
    res.render("events.add");
});

module.exports = router;
