const express = require("express");
const router = express.Router();

//require models
const Categories = require("../models/Categories");
const UsersInfo = require("../models/UsersInfo");

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
router.get("/add", async (req, res) => {
    var categories = await Categories.findAll();
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    res.render("courses.add", {
        pageName: "Add Course",
        pageTitle: "Add Course - JMP",
        categories,
        currentUser
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
