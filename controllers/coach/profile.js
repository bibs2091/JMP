module.exports = (req, res) => {
    res.render("coach.profile", {
        pageName: "My Profile",
        pageTitle: "username"
    });
};