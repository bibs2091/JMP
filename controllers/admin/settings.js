const InfoSite = require("../../models/InfoSite");

module.exports = async (req, res) => {
  var info = await InfoSite.findAll();
  // info = info[0].dataValues;
  console.log(info);
  res.render("admin.settings", {
    pageName: "Settings",
    pageTitle: "Settings - Dashboard"
  });
};
