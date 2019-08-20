module.exports = (req, res, next) => {
    	// is coach or admin
    if (req.user.groupId == 1 || req.user.groupId == 0)
    	return next();
    return res.render("404");
};