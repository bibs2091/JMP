module.exports = (req, res) => {
    res.render("coach.home", {
        pageName: "Home",
        pageTitle: "username - Home"
    });
};