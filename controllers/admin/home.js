module.exports = (req, res) => {
    res.render("admin.home", {
        pageTitle: "Dashboard- Home",
        pageName: "Home"
    });
};