module.exports = (req, res) => {
    res.render("admin.users", {
        pageName: "Managing Users",
        pageTitle: "Dashboard - Users"
    });
}