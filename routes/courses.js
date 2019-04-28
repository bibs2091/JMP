const express = require("express");
const router = express.Router();

//require controllers
const addController = require("../controllers/courses/add");
const courseDetailsController = require("../controllers/courses/courseDetails");
const updatePageController = require("../controllers/courses/updatePage");
const updateController = require("../controllers/courses/update");
const deleteCourseController = require("../controllers/courses/delete");
const wishlistController = require("../controllers/courses/wishlist");
const courseController = require("../controllers/courses/course");
const courseContentController = require("../controllers/courses/courseContent");
const certificatController = require("../controllers/courses/certificat");

//handling requests 
router.post("/add", addController);
router.get("/add", (req, res) => {
    res.render("courses.add", {
        pageName: "Add Course",
        pageTitle: "Add Course - JMP"
    });
})

router.get("/:id", courseDetailsController);
router.get("/update/:id", updatePageController);
router.post("/update/:id", updateController);
router.delete("/delete/:id", deleteCourseController);
router.post("/wishlist/:id", wishlistController);
router.get("/classroom/:id", courseController);
router.get("/classroom/:course/certificat", certificatController);
router.get("/classroom/:course/:lecture", courseContentController);

module.exports = router;
