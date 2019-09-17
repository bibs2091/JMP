const UsersInfo = require("../models/UsersInfo");
const Events = require("../models/Event");
const Courses = require("../models/Courses");
const Sequelize = require("sequelize");

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        //getting the search query
        var query = req.query.q;

        //gettings for users
        var users = await UsersInfo.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { firstName: { [Sequelize.Op.like]: `%${query}%` } },
                    { lastName: { [Sequelize.Op.like]: `%${query}%` } },
                    { username: { [Sequelize.Op.like]: `%${query}%` } }
                ]

            }
        });
        //gettings Events
        var events = await Events.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.like]: `%${query}%` } },
                    { description: { [Sequelize.Op.like]: `%${query}%` } }
                ]
            }
        });
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        for (let i = 0; i < events.length; i++) {
            events[i].month = months[events[i].start_d.substring(5, 7) - 1];
            let today = new Date();
            let eveDate = new Date(events[i].start_d.substring(0, 10));
            events[i].upcoming = eveDate > today;
        }
        //getting courses
        var courses = await Courses.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { title: { [Sequelize.Op.like]: `%${query}%` } },
                    { description: { [Sequelize.Op.like]: `%${query}%` } }
                ]
            }
        });
        return res.render("search", {
            pageName: "Search Results",
            pageTitle: "Results for: " + query,
            currentUser,
            users,
            events,
            courses
        });
    }
    catch (e) {
        console.log(e.message);
        res.redirect("/error")
    }
}