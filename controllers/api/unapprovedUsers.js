const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var users = await Users.findAll({ where: { groupId: 3 } });
    var data = [];
    for (let i = 0; i < users.length; i++) {
        let info = await UsersInfo.findOne({ where: { userId: users[i].id } });
        users[i] = users[i].dataValues;
        info = info.dataValues;
        let tools = `<i class='fa fa-times' style='color:red' onclick='deleteUser(${users[i].id})'></i>
        <i class='fa fa-check' style='color:green' onclick='approveUser(${users[i].id})'></i>
        `;
        let currentUser = [users[i].email, info.firstName, info.lastName, info.username, info.phone, info.score, tools];
        data.push(currentUser);
    }

    res.send({ data });
}