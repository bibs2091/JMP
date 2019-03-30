const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
	res.send("this is test for users");
});

module.exports = router;
