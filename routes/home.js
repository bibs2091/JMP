const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log(req.session);
	res.render("index");
});

module.exports = router;
