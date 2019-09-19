const Info = require("../models/InfoSite");

module.exports = async (req, res, next) => {
    try {
        var info = await Info.findAll();
        console.log();
        info = info[0].dataValues;
        if (info.inscription) {
            return next();
        }
        return res.render("auth.registrationClosed", { message: info.registration_message });
    } catch{
        res.redirect("/error");
    }
};