const UsersInfo = require("../models/UsersInfo");

module.exports = (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    console.log(req.query);
    return res.render("search", {
        pageName: "search results",
        pageTitle: "search for ...",
        currentUser
    })
}