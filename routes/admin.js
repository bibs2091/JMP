const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/admin/home");
const categoriesController = require("../controllers/admin/categories");
const addCategoryController = require("../controllers/admin/addCategory");
//handling requests 
router.get("/", (req, res) => {
    res.redirect("/admin/home");
});
router.get("/home", homeController);
router.get("/categories", categoriesController);
router.post("/addcategory", addCategoryController);

module.exports = router;
