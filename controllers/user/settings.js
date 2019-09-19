const UsersInfo = require("../../models/UsersInfo");
const Users = require("../../models/Users");

module.exports = async (req, res) => {
    //get the current user
    let userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    let user = await Users.findOne({where :  {id : req.user.id}});
    userInfo = userInfo.dataValues;
    user = user.dataValues;
    var currentUser = req.user;
    delete currentUser.password;
    currentUser.info = userInfo;
    userInfo.skills = userInfo.skills.split('||');
    let messages = "A";
    console.log(currentUser);
    res.render("user.editProfile", {
        pageTitle: "Profile settings",
        pageName: "Profile Settings",
        messages,
        currentUser,
        userInfo,
        user
    });
}