module.exports = (req, res) => {
    res.render("user.editProfile", {
        pageName: "My Profile",
        pageTitle: "username"
    });
};