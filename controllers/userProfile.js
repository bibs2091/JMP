const userInfo = require("../models/UsersInfo");

module.exports = async (req, res) => {
	let userId = req.params.id;

	const { dataValues } = await userInfo.findOne({ where: { userId } });
	const profile = dataValues;
	console.log(profile);

	let {
		firstName,
		lastName,
		username,
		avatar,
		bio,
		score,
		rank,
		skills,
		facebook,
		twitter,
		instagram,
		github,
		linkedin,
	} = profile;
	// format the social media links
	facebook = facebook || "";
	instagram = instagram || "";
	twitter = twitter || "";
	linkedin = linkedin || "";
	github = github || "";

	res.render("userProfile", {
		pageName: username,
		pageTitle: firstName + " " + lastName,
		firstName,
		lastName,
		username,
		avatar,
		bio,
		score,
		rank,
		skills,
		facebook,
		twitter,
		instagram,
		github,
		linkedin,
	});
};
