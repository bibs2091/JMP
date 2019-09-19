const UsersInfo = require("../../models/UsersInfo");
const Users = require("../../models/Users");

module.exports = async (req, res) => {
    //get the current user
    let userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    let user = await Users.findOne({where :  {id : req.user.id}});
    delete userInfo.dataValues.createdAt;
    delete userInfo.dataValues.updatedAt;
    delete user.dataValues.password;
    userInfo = userInfo.dataValues;
    user = user.dataValues;
    var currentUser = req.user;
    currentUser.info = userInfo.dataValues;
    userInfo.skills = userInfo.skills.split('||');
    let messages = req.flash();
            if (Object.keys(messages).length === 0) {
                messages = "A";
            }
    console.log(messages);
    res.render("user.editProfile", {
        pageTitle: "Profile settings",
        pageName: "Profile Settings",
        messages,
        currentUser,
        userInfo,
        user
    });
}