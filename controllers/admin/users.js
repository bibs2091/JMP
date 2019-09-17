const UsersInfo = require("../../models/UsersInfo");
const Users = require("../../models/Users");


module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    var unapproved = await Users.findAll({
        where: {
            groupId: 3
        }
    });
    var students = await Users.findAll({
        where: {
            groupId: 2
        }
    });
    var coaches = await Users.findAll({
        where: {
            groupId: 1
        }
    });
    var admins = await Users.findAll({
        where: {
            groupId: 0
        }
    });
    res.render("admin.users", {
        pageName: "Managing Users",
        pageTitle: "Dashboard - Users",
        currentUser,
        unapproved: unapproved.length,
        students: students.length,
        coaches: coaches.length,
        admins: admins.length
    });
}