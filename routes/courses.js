const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/courses/add");
const courseDetailsController = require("../controllers/courses/courseDetails");

//handling requests 
router.post("/add", addController);
router.get("/add", (req, res) => {
    res.render("courses.add", {
        pageName: "Add Course",
        pageTitle: "Add Course - JMP"
    });
})

router.get("/:id", courseDetailsController);

module.exports = router;
