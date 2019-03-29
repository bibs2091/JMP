const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
	res.send("POST in logout is workin fine ");
});

module.exports = router;
