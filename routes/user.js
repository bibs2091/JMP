const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/user/home");
const showWishlistController = require("../controllers/user/wishlist");
const myCoursesController = require("../controllers/user/mycourses");
const catalogController = require("../controllers/user/catalog");
const userSettingsController = require("../controllers/user/settings");

//load userInfo model
const userInfo = require("../models/UsersInfo");

//middleware for authentication
const isAuthenticated = require("../middleware/isAuthenticated");
const isStudent = require("../middleware/isStudent");

//handling requests
router.get("/home", isAuthenticated, homeController);
router.get("/mycourses", isAuthenticated, isStudent, myCoursesController);

//route		/user/editprofile
//methode 	GET
//access	private
//desc		get current user profile

router.get("/settings", isAuthenticated, userSettingsController);
//route		/user/editprofile
//methode 	POST
//access	private
//desc		post to current user profile

router.get("/wishlist", isAuthenticated, showWishlistController);
router.get("/catalog", isAuthenticated, catalogController);

router.post("/settings", isAuthenticated, (req, res) => {
	console.log(req.body);
	let {
		firstName,
		lastName,
		phoneNumber,
		facebook,
		twitter,
		linkedin,
		github,
	} = req.body;

	userInfo
		.update(
			{
				firstName,
				lastName,
				phoneNumber,
				facebook,
				twitter,
				linkedin,
				github,
			},
			{ where: { userId: req.user.id } }
		)
		.then(updated => {
			console.log(updated);
			res.send("profile updated");
		})
		.catch(err => console.log(err));
});

module.exports = router;
