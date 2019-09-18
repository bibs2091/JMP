const UsersInfo = require("../../models/UsersInfo");
const InfoSite = require("../../models/InfoSite");

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        var info = await InfoSite.findAll();
        if (info.length == 0) {
            await InfoSite.create({
                logo: "/favicon.png",
                nom: "JMP",
                description: "JMP description",
                adresse: "Chlef - Algeria",
                inscription: true,
                email: "jmp@gmail.com",
                registration_message: "registration message"
            });
            info = await InfoSite.findAll();
        };
        res.render("admin.settings", {
            pageName: "Settings",
            pageTitle: "Settings - Dashboard",
            currentUser,
            info: info[0]
        });
    }
    catch (err) {
        console.log(err);
        res.redirect("/error");
    }
}