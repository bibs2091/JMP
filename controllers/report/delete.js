const Report = require("../../models/Report");

module.exports = async (req, res) => {
    var reportId = req.params.id;
    //delte the course
    await Report.destroy({ where: { id: reportId } });
    res.send({ success: true });

}