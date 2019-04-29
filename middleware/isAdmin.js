module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
    	if (req.user.groupId === 0)
        	next();
    }
    return res.render("404");
};