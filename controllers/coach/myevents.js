const UsersInfo = require("../../models/UsersInfo");
module.exports = async (req, res) => {
try {//get current user info
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;
        return res.render("coach.myevents", {
            pageName: "My Events",
            pageTitle: currentUser.info.username + " - My Events",
            currentUser,
        });
    } catch (err){
        console.log(err);
        return res.redirect("/error");
    }
};