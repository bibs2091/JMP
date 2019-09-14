const UsersInfo = require("../../models/UsersInfo");


module.exports = async (req, res) => {
    try {
        //get the current user
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        res.render("user.events", {
            currentUser,
            pageName: "My Events",
            pageTitle: "My Events - JMP"
        });
    }
    catch (err) {
        console.log(err);
        res.redirect("/error");
    }
}