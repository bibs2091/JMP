const userInfo = require("../models/UsersInfo");
const { githubApi } = require("../config/keys");
const axios = require("axios");

module.exports = async (req, res) => {
	try {
		const { id } = req.params
		let profile = await userInfo.findOne({ where: { userId: id } });
		if (profile) {
			profile = profile.dataValues
			delete profile.id
			delete profile.createdAt
			delete profile.updatedAt

			// format the social media links
			profile.facebook = profile.facebook || "";
			profile.twitter = profile.twitter || "";
			profile.linkedin = profile.linkedin || "";
			profile.github = profile.github || "";


			let repos = [];

			//fetch data from the github api
			if (profile.github) {
				let github = profile.github
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
			// res.json(repos)
			res.render("userProfile", {
				pageName: profile.username,
				pageTitle: profile.firstName + " " + profile.lastName,
				profile,
				repos,
				myProfile: req.user.id == req.params.dude
			});
		} else {
			return res.render("404");
		}
	} catch (err) {
		console.log(err);
	}
};
