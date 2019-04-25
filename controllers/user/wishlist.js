const WishLists = require("../../models/WishLists");
const Courses = require("../../models/Courses");

module.exports = async (req, res) => {
    const userId = req.user.id;
    let wishlist = await WishLists.findAll({ where: { userId } });
    var courses = [];
    for (let i = 0; i < wishlist.length; i++) {
        let course = await Courses.findByPk(wishlist[i].dataValues.id);
        courses.push(course);
    }
    res.render("user.wishlist", {
        pageName: "My Wishlist",
        pageTitle: "My Wishlist - JMP",
        courses
    });
}