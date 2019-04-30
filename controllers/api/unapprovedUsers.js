const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var users = await Users.findAll({ where: { groupId: 3 } });
    var data = [];
    for (let i = 0; i < users.length; i++) {
        let info = await UsersInfo.findOne({ where: { userId: users[i].id } });
        users[i] = users[i].dataValues;
        info = info.dataValues;
        let tools = "<i class='fa fa-times' onclick='deleteUser(" + users[i].id + ")'></i>"
        let currentUser = [info.avatar, users[i].email, info.firstName, info.lastName, info.username, info.phone, info.score, tools];
        data.push(currentUser);
    }
    var responseJSON = {
        "data": data
    };
    console.log(responseJSON);
    res.send(responseJSON);
}