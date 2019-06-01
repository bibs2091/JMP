module.exports = (req, res, next) => {
    if (req.user.groupId == 0)
        return next();
    return res.render("404");

};