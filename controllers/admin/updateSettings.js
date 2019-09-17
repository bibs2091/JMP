module.exports = (req, res) => {
    console.log(req.body);
    res.redirect("/admin/settings");
}