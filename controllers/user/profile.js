const userInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
	const id = req.user.id;
	const user = await userInfo.findOne({ where: { userId: id } });
	const profile = user.dataValues;
	console.log(profile);

	let {
		firstName,
		lastName,
		bio,
		username,
		phone,
		facebook,
		instagram,
		twitter,
		github,
		linkedin,
	} = profile;
	facebook = facebook || "";
	instagram = instagram || "";
	twitter = twitter || "";
	github = github || "";
	linkedin = linkedin || "";

	res.render("user.editProfile", {
		pageName: firstName + " " + lastName,
		pageTitle: username,
		firstName,
		lastName,
		bio,
		phone,
		facebook,
		instagram,
		twitter,
		github,
		linkedin,
	});
};
