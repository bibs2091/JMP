const db = require("../../config/database");
const Categories = require("../../models/Categories");

db.sync({ forced: true });
module.exports = async (req, res) => {
    const { image } = req.files;
    let category = await Categories.create(req.body);
    image.mv(__dirname + "/../../public/categories/" + category.dataValues.id + ".jpg",
        (err) => {
            console.log(err);
            Categories.update(
                { cover: "/categories/" + category.dataValues.id + ".jpg" },
                { where: { id: category.dataValues.id } }
            ).then(() => {
                return res.redirect("/admin/categories");
            });
        });
}