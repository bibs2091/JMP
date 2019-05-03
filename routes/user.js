const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/user/home");
const editProfileController = require("../controllers/user/profile");
const showWishlistController = require("../controllers/user/wishlist");

//load userInfo model
const userInfo = require("../models/UsersInfo");

//middleware for authentication
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests
router.get("/home", isAuthenticated, homeController);

//route		/user/editprofile
//methode 	GET
//access	private
//desc		get current user profile

router.get("/editprofile", editProfileController);
router.get("/editprofile2", (req, res) => {
	res.render("user.editProfile2");
})
//route		/user/editprofile
//methode 	POST
//access	private
//desc		post to current user profile

router.get("/wishlist", isAuthenticated, showWishlistController);

router.post("/editprofile", isAuthenticated, (req, res) => {
	console.log(req.body);
	let {
		firstName,
		lastName,
		phoneNumber,
		facebook,
		instagram,
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
				instagram,
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
