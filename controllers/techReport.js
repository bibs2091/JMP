const techReports = require("../models/techReports");

module.exports = async (req, res) => {
    await techReports.create(req.body);
    res.redirect("/");
}