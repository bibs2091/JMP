const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    const user = await UsersInfo.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.redirect("/error");
    }
    //delete user
    await Users.destroy({
        where: {
            id: req.params.id
        }
    });
    //delete users info
    await UsersInfo.destroy({
        where: {
            userId: req.params.id
        }
    });
    //delete user picture
    console.log("deleted");
    res.send({ succuess: true });
}