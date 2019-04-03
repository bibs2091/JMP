module.exports = (req, res) => {
	res.render("index");
	console.log(req.sessionID);
};
