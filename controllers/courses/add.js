module.exports = (req, res) => {
    console.log(req.body.courseJSON);
    res.redirect("/courses/add")
}