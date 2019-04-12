module.exports = (req, res) => {
    res.render("admin.courses", {
        pageName: "Courses",
        pageTitle: "Dashbaord - Courses"
    });
}