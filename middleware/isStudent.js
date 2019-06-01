module.exports = (req, res, next) => {
    if (req.user.groupId == 2)
        return next();
    return res.render("404");
};