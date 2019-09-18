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
router.put("/users/approve/:id", approveUserController);
router.put("/users/makecoach/:id", (req, res) => {
    Users.update({ groupId: 1 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.put("/users/makeadmin/:id", (req, res) => {
    Users.update({ groupId: 0 }, { where: { id: req.params.id } });
    res.send({ success: true });
});
router.get("/settings", settingsController);
router.get("/exportDB", exportDBController);
router.post("/importDB", importDBController);
router.post("/settings/update", updateSettingsController);
router.get("/database", async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    res.render("admin.database", {
        pageName: "Import/Export Database",
        pageTitle: "Database settings",
        currentUser
    });
});
router.get("/reportcenter", reportCenterController);

module.exports = router;
