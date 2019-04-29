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

//require middelware
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests 
router.post("/add", addController);
router.get("/add", (req, res) => {
    res.render("courses.add", {
        pageName: "Add Course",
        pageTitle: "Add Course - JMP"
    });
})

router.get("/:id", courseDetailsController);
router.get("/update/:id", isAuthenticated, updatePageController);
router.post("/update/:id", isAuthenticated, updateController);
router.delete("/delete/:id", isAuthenticated, deleteCourseController);
router.post("/wishlist/:id", isAuthenticated, wishlistController);
router.get("/classroom/:id", isAuthenticated, courseController);
router.get("/classroom/:course/certificat", isAuthenticated, certificatController);
router.get("/classroom/:course/:lecture", isAuthenticated, courseContentController);

module.exports = router;
