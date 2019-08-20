module.exports = async (req, res) => {
    res.render("admin.settings", {
        pageName: "Settings",
        pageTitle: "Settings - Dashboard"
    });
}