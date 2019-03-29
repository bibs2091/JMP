const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("register is workin fine ");
});

router.post("/", (req, res) => {
	res.send("POST in register is workin fine ");
});

module.exports = router;
