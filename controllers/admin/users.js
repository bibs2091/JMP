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

    res.render("admin.users", {
        pageName: "Managing Users",
        pageTitle: "Dashboard - Users",
        currentUser,
        unapproved: unapproved.length,
        students,
        coaches,
        admins
    });
}