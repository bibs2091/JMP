module.exports = (req, res, next) => {
    if (req.user.groupId == 1)
    	return next();
    return res.render("404");
};