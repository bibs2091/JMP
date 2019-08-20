const userInfo = require("../models/UsersInfo");
const { githubApi } = require("../config/keys");
const axios = require("axios");

module.exports = async (req, res) => {
	try {
		let userId = req.params.id;

		const profile = await userInfo.findOne({ where: { userId } });

		if (profile) {
			const { dataValues } = profile;
			console.log(dataValues);

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
				github,
				linkedin,
			} = dataValues;
			// format the social media links
			facebook = facebook || "";
			twitter = twitter || "";
			linkedin = linkedin || "";
			github = github || "";

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
				github,
				linkedin,
				repos,
			});
		} else {
			return res.render("404");
		}
	} catch (err) {
		console.log(err);
	}
};
