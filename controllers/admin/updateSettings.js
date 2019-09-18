const InfoSite = require("../../models/InfoSite");

module.exports = async (req, res) => {
    req.body.inscription = req.body.registration == "on" ? true : false;

    if (req.files) {
        const { logo } = req.files;
        await logo.mv(__dirname + "/../../public/favicon.png");
    }
    await InfoSite.update(req.body, {
        where: {
            logo: "/favicon.png"
        }
    })
    res.redirect("/admin/settings");
}