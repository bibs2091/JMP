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
const quizPageController = require("../controllers/courses/quizPage");

//require middelware
const isAuthenticated = require("../middleware/isAuthenticated");
const isStudent = require("../middleware/isStudent");
const isAdminOrCoach = require("../middleware/isAdminOrCoach");

//handling requests 
router.post("/add", isAuthenticated, isAdminOrCoach, addController);
router.get("/add", isAuthenticated, isAdminOrCoach, async (req, res) => {
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

router.get("/:id", isAuthenticated, courseDetailsController);
router.get("/update/:id", isAuthenticated, isAdminOrCoach, updatePageController);
router.post("/update/:id", isAuthenticated, isAdminOrCoach, updateController);
router.delete("/delete/:id", isAuthenticated, isAdminOrCoach, deleteCourseController);
router.post("/wishlist/:id", isAuthenticated, wishlistController);
router.get("/classroom/:id", isAuthenticated, courseController);
router.get("/classroom/:course/certificat", isAuthenticated, isStudent, certificatController);
router.get("/classroom/:course/:lecture", isAuthenticated, courseContentController);
router.get("/classroom/quiz/:courseId/:chapId", isAuthenticated, quizPageController);

module.exports = router;
