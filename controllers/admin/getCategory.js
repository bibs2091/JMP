const Categories = require("../../models/Categories");

module.exports = async (req, res) => {
    let category = await Categories.findByPk(req.params.id);
    res.json(category.dataValues);
}