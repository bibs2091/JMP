const express = require("express");
const router = express.Router();

//require models
const Users = require("../models/Users");
const UsersInfo = require("../models/UsersInfo");


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
const updateSettingsController = require("../controllers/admin/updateSettings");
const exportDBController = require("../controllers/admin/exportDB");
const importDBController = require("../controllers/admin/importDB");
const approveUserController = require("../controllers/admin/approveUser");

//require middleware
const isAuth = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

//handling requests 
router.get("/", (req, res) => {
    res.redirect("/admin/home");
});
router.get("/home", isAuth, isAdmin, homeController);
router.get("/categories", isAuth, isAdmin, categoriesController);
router.post("/addcategory", isAuth, isAdmin, addCategoryController);
router.get("/courses", isAuth, isAdmin, coursesController);
router.get("/category/:id", isAuth, isAdmin, getCategoryController);
router.delete("/category/delete/:id", isAuth, isAdmin, deleteCategoryController);
router.post("/category/update/:id", isAuth, isAdmin, updateCategoryController);
router.get("/users", isAuth, isAdmin, usersController);
router.delete("/users/delete/:id", isAuth, isAdmin, deleteUserController);
router.put("/users/approve/:id", isAuth, isAdmin, approveUserController);
router.put("/users/makecoach/:id", isAuth, isAdmin, (req, res) => {
    Users.update({ groupId: 1 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.put("/users/makeadmin/:id", isAuth, isAdmin, (req, res) => {
    Users.update({ groupId: 0 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.get("/settings", isAuth, isAdmin, settingsController);
router.get("/exportDB", isAuth, isAdmin, exportDBController);
router.post("/importDB", isAuth, isAdmin, importDBController);
router.post("/settings/update", isAuth, isAdmin, updateSettingsController);
router.get("/reportcenter", isAuth, isAdmin, reportCenterController);

module.exports = router;
