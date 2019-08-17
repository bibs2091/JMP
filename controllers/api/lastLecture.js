const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");

module.exports = async (req, res) => {
    var chaps = await Chapters.findAll({ where: { formation: req.params.id } });
    var lects = await Lectures.findAll({ where: { chapter: chaps[chaps.length - 1].id } });
    console.log(lects[lects.length - 1].dataValues);
    res.send({
        id: lects[lects.length - 1].id
    })
}