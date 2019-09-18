const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");

const { connectedUsers } = require('../../config/socket')

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        var usersNumber = await Users.findAll();
        usersNumber = usersNumber.length;
        var coursesNumber = await Courses.findAll();
        coursesNumber = coursesNumber.length;
        var coachsNumber = await Users.findAll({
            where: { groupId: 1 }
        });
        coachsNumber = coachsNumber.length;

        let countConnectedUsers = connectedUsers.size

        res.render("admin.home", {
            pageTitle: "Dashboard- Home",
            pageName: "Dashboard",
            currentUser,
            usersNumber,
            coursesNumber,
            coachsNumber,
            countConnectedUsers
        });
    }
    catch (e) {
        console.log(e.message);
        res.redirect("/error");
    }

};