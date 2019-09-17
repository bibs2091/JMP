const Report = require("../../models/Report");
const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Quizs = require("../../models/Quizs");
const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
	var currentUser = req.user;
	var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
	delete currentUser.password;
	currentUser.info = userInfo.dataValues;

	var reports = await Report.findAll({
		order: [['createdAt', 'DESC']]
	});
	for (let i = 0; i < reports.length; i++) {
		if (reports[i].indictedType == "Quiz") {

			const quiz = await Quizs.findOne({
				where: {
					id: reports[i].indictedId
				}
			});
			if (!quiz) {
				reports[i].indicted = "Quiz";
				reports[i].indictedType = "[Deleted]";
			}
			else {

				const chapter = await Chapters.findOne({
					where: {
						id: quiz.chapterId
					}
				});
				if (!chapter) {
					reports[i].courseName = "[Deleted]";
				} else {
					const course = await Courses.findOne({
						where: {
							id: chapter.formation
						}
					});
					if (!course) {
						reports[i].courseName = "[Deleted]";
					} else {
						reports[i].courseName = course.title;
					}

				}
			}

		} else if (reports[i].indictedType == "Course") {
			const course = await Courses.findOne({
				where: {
					id: reports[i].indictedId
				}
			});
			if (!course) {
				reports[i].indicted = "Course";
				reports[i].indictedType = "[Deleted]";
			}

		} else if (reports[i].indictedType == "User") {
			const user = await Users.findOne({
				where: {
					id: reports[i].indictedId
				}
			});
			if (!user) {
				reports[i].indicted = "User";
				reports[i].indictedType = "[Deleted]";
			}
		}
		reports[i].date = reports[i].createdAt.getFullYear() +
			'-' + ('0' + (reports[i].createdAt.getMonth() + 1)).slice(-2) +
			'-' + ('0' + reports[i].createdAt.getDate()).slice(-2) +
			"  " + ('' + reports[i].createdAt).slice(-50, -41);

	}

	//console.log(reports);
	res.render("admin.reportCenter", {
		reports,
		currentUser,
		pageName: "Reports Center",
		pageTitle: "Dashboard - Reports Center"
	});
}