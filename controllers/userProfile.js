const userInfo = require("../models/UsersInfo");
const progress = require('../models/Progress')
const Courses = require('../models/Courses')
const RawUsers = require('../models/Users')
const { githubApi } = require("../config/keys");
const axios = require("axios");
const Op = require('sequelize').Op
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
			let myCourses = []
			if (isCoach(id)) {
				//fetch courses as coach
				myCourses = await getCoachCourses(id)
			} else {
				//fetch crouses as a student
				myCourses = await getStudentCourses(id)
			}

			res.render("userProfile", {
				pageName: profile.username,
				pageTitle: profile.firstName + " " + profile.lastName,
				profile,
				repos,
				myCourses,
				myProfile: req.user.id == req.params.dude
			});
		} else {
			return res.render("404");
		}
	} catch (err) {
		console.log(err);
	}
};

//helper functions 
const getStudentCourses = async (id) => {
	let courses = await progress.findAll({
		where: { userId: id }
	})
	courses = courses.map(course => {
		return course.dataValues.courseId
	})
	let mycourses = await Courses.findAll({
		where: {
			id: { [Op.or]: courses }
		}
	})
	mycourses = mycourses.map(async course => {
		let author = await userInfo.findByPk(course.author)
		course.dataValues.author = `${author.dataValues.firstName} ${author.dataValues.lastName}`
		course.dataValues.authorAvatar = author.dataValues.avatar
		delete course.dataValues.createdAt
		delete course.dataValues.updatedAt
		return course.dataValues
	})

	return Promise.all(mycourses)
}

const getCoachCourses = async (id) => {
	try {
		let courses = await Courses.findAll({
			where: { author: id }
		})
		courses = courses.map(async course => {
			let author = await userInfo.findByPk(course.dataValues.author)
			course.dataValues.author = `${author.dataValues.firstName} ${author.dataValues.lastName}`
			course.dataValues.authorAvatar = author.dataValues.avatar
			delete course.dataValues.createdAt
			delete course.dataValues.updatedAt
			return course.dataValues
		})
		return Promise.all(courses)
	} catch (error) {
		return []
	}

}

const isCoach = async (id) => {
	let user = await RawUsers.findByPk(id)
	return user.dataValues.groupId === 1
}