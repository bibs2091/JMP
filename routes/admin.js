const express = require("express");
const router = express.Router();

//require models
const Users = require("../models/Users");

//require controllers
const homeController = require("../controllers/admin/home");
const categoriesController = require("../controllers/admin/categories");
const addCategoryController = require("../controllers/admin/addCategory");
const coursesController = require("../controllers/admin/courses");
const getCategoryController = require("../controllers/admin/getCategory");
const deleteCategoryController = require("../controllers/admin/deleteCategory");
const updateCategoryController = require("../controllers/admin/updateCategory");
const usersController = require("../controllers/admin/users");
const deleteUserController = require("../controllers/admin/deleteUser");
const settingsController = require("../controllers/admin/settings");
const reportCenterController = require("../controllers/admin/reportCenter");

//handling requests 
router.get("/", (req, res) => {
    res.redirect("/admin/home");
});
router.get("/home", homeController);
router.get("/categories", categoriesController);
router.post("/addcategory", addCategoryController);
router.get("/courses", coursesController);
router.get("/category/:id", getCategoryController);
router.delete("/category/delete/:id", deleteCategoryController);
router.post("/category/update/:id", updateCategoryController);
router.get("/users", usersController);
router.delete("/users/delete/:id", deleteUserController);
router.put("/users/approve/:id", (req, res) => {
    Users.update({ groupId: 2 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.put("/users/makecoach/:id", (req, res) => {
    Users.update({ groupId: 1 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.get("/settings", settingsController);
router.get("/reportcenter", reportCenterController);

module.exports = router;
