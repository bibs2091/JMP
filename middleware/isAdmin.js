module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
    	if (req.user.groupId === 0)
        	next();
    }
    else 
    	return res.render("404");
};