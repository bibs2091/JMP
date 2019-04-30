const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("test for messages get");
});

module.exports = router;
