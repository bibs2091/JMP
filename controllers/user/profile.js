module.exports = (req, res) => {
    res.render("user.profile", {
        pageName: "My Profile",
        pageTitle: "username"
    });
};