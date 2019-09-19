const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = async (req, res) => {
    var users = await Users.findAll({
        where: {
            groupId: 2
        }
    });
    var data = [];
    for (let i = 0; i < users.length; i++) {
        let info = await UsersInfo.findOne({ where: { userId: users[i].id } });
        users[i] = users[i].dataValues;
        info = info.dataValues;
        let tools = `<i class='fa fa-times' style='color:red' data-toggle='toolip' data-original-title='Delete user' onclick='deleteUser(${users[i].id})'></i>
        <i class='fa fa-arrow-up' style='color:green' data-toggle='toolip' data-original-title='Make Coach' onclick='makeCoach(${users[i].id})'></i>
        `;
        let avatar = `<center><img src='${info.avatar}' class='user-avatar'></center>`;
        let currentUser = [avatar, users[i].email, info.firstName, info.lastName, info.username, info.phone, info.score, tools];
        data.push(currentUser);
    }

    res.send({ data });
}