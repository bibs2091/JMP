module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
    	// is coach or admin
    	if (req.user.groupId === 1 || req.user.groupId === 0)
        	next();
    }
    else 
    	return res.render("404");
};