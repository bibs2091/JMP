const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log(req.session);
	res.send("home is workin fine ");
});

module.exports = router;
