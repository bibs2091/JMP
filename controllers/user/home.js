module.exports = (req, res) => {
    res.render("user.home", {
        pageName: "Home",
        pageTitle: "username - Home"
    });
};