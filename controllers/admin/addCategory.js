const db = require("../../config/database");
const Categories = require("../../models/Categories");

db.sync({ forced: true });
module.exports = async (req, res) => {
    const { image } = req.files;
    let searchCat = await Categories.findOne({ where: { title: req.body.title } });
    if (searchCat) {
        req.flash("errors", "Category already exists");
        return res.redirect("/admin/categories");
    }
    let category = await Categories.create(req.body);
    image.mv(__dirname + "/../../public/categories/" + category.dataValues.id + ".jpg",
        (err) => {
            if (err) {
                req.flash("errors", "An error has occured, try again");
                return res.redirect("/admin/categories");
            }
            Categories.update(
                { cover: "/categories/" + category.dataValues.id + ".jpg" },
                { where: { id: category.dataValues.id } }
            ).then(() => {
                return res.redirect("/admin/categories");
            });
        });
}