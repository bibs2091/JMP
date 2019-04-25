const userInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
	const id = req.user.id;
	const user = await userInfo.findOne({ where: { userId: id } });
	const profile = user.dataValues;
	console.log(profile);

	let {
		firstName,
		lastName,
		avatar,
		bio,
		username,
		score,
		skills,
		rank,
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

	let repos = [];

	//fetch data from the github api
	if (github) {
		const count = 5;
		const sort = "created: asc";
		const link = `https://api.github.com/users/${github}/repos?per_page=${count}&sort=${sort}&client_id=${
			githubApi.clientId
		}&client_secret=${githubApi.clientSecret}`;

		try {
			const response = await axios.get(link);
			repos = response.data;
		} catch (error) {
			console.log(error);
		}
	}

	res.render("user.profile", {
		pageName: username,
		pageTitle: firstName + " " + lastName,
		firstName,
		lastName,
		avatar,
		score,
		rank,
		bio,
		skills,
		phone,
		facebook,
		instagram,
		twitter,
		github,
		linkedin,
		repos,
	});
};
