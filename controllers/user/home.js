const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");
const WishLists = require("../../models/WishLists");
const Categories = require("../../models/Categories");
const Events = require("../../models/Event");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;
        var { data } = await axios.get("http://5cc87506.ngrok.io/recSys/" + req.user.id);
        var coursesType = data.length > 0 ? "Recommended " : "Discover some ";
        var courses = [];
        if (data.length > 0) {
            for (let i = 0; i < 3; i++) {
                let tCourse = await Courses.findByPk(data[i]);
                courses.push(tCourse);
            }
        } else {
            courses = await Courses.findAll({ limit: 3 });
        }
        var { data } = await axios.get("http://5cc87506.ngrok.io/recSys/mostPopCourses");
        if (data.length > 0) {
            for (let i = 0; i < 3; i++) {
                let tCourse = await Courses.findByPk(data[i]);
                courses.push(tCourse);
            }
        } else {
            courses = await Courses.findAll({ limit: 3 });
        }
        for (let i = 0; i < courses.length; i++) {
            courses[i] = courses[i].dataValues;
            var duration = "";
            var author = await UsersInfo.findOne({ where: { userId: courses[i].author } });
            courses[i].author = author.firstName + " " + author.lastName;
            courses[i].authorImage = author.avatar;
            courses[i].duration = Math.floor(courses[i].duration / 60);
            if (courses[i].duration > 60) {
                duration += Math.floor(courses[i].duration / 60) + " h ";
            }
            duration += courses[i].duration % 60 + " mn";
            courses[i].duration = duration;
            var progress = await Progress.findOne({
                where: {
                    userId: req.user.id,
                    courseId: courses[i].id
                }
            });
            var wishlist = await WishLists.findOne({
                where: {
                    userId: req.user.id,
                    courseId: courses[i].id
                }
            });
            if (wishlist) {
                courses[i].wishlist = true;
            } else {
                courses[i].wishlist = false;
            }
            if (progress) {
                var state = progress.state;
            } else {
                state = "start";
            }
            courses[i].state = state;
        }
        //getting the events
        var events = await Events.findAll({
            where: {
                start_d: { [Op.gt]: new Date() }
            },
            limit: 2
        });
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let i = 0; i < events.length; i++) {
            events[i] = events[i].dataValues;
            events[i].month = months[events[i].start_d.substring(5, 7)];
        }
        var categories = await Categories.findAll({ limit: 3 });
        console.log(courses);
        var pcourses = courses.slice(3, 6);
        courses = courses.slice(0, 3);
        res.render("user.home", {
            pageName: "Home",
            pageTitle: currentUser.info.username + " - Home",
            currentUser,
            courses,
            categories,
            events,
            coursesType,
            pcourses
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect("/error");
    }
};