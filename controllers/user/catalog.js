const UsersInfo = require("../../models/UsersInfo");
const Categories = require("../../models/Categories");
const WishLists = require("../../models/WishLists");
const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");

module.exports = async (req, res) => {

    //get the current user
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    //all categories
    var categories = await Categories.findAll();
    var catId = req.query.cat ? req.query.cat : categories[0].id;
    var category = await Categories.findByPk(catId);
    if (!category)
        return res.render("404");
    var courses = await Courses.findAll({ where: { category: catId } });
    for (let i = 0; i < courses.length; i++) {
        courses[i] = courses[i].dataValues;
        var duration = "";
        var author = await UsersInfo.findOne({ where: { userId: courses[i].author } });
        courses[i].author = author.firstName + " " + author.lastName;
        courses[i].authorImage = author.avatar;
        courses[i].duration = Math.floor(courses[i].duration / 60);
        if (courses[i].duration > 60) {
            duration += Math.floor(courses[i].duration / 60) + " h ";
        }
        duration += courses[i].duration % 60 + " mn";
        courses[i].duration = duration;
        var progress = await Progress.findOne({
            where: {
                userId: req.user.id,
                courseId: courses[i].id
            }
        });
        var wishlist = await WishLists.findOne({
            where: {
                userId: req.user.id,
                courseId: courses[i].id
            }
        });
        if (wishlist) {
            courses[i].wishlist = true;
        } else {
            courses[i].wishlist = false;
        }
        if (progress) {
            var state = progress.state;
        } else {
            state = "start";
        }
        courses[i].state = state;
    }
    res.render("user.catalog", {
        pageName: "Catalog",
        pageTitle: "Catalog - JMP",
        currentUser,
        categories,
        catId,
        courses
    });
}