module.exports = (req, res, next) => {
    if (!req.isAuthenticated())
        return next();
    if (req.user.groupId == 0) {
        return res.redirect("/admin/home")
    } else if (req.user.groupId == 1) {
        return res.redirect("/coach/home")
    } else {
        return res.redirect("/user/home");
    }
};