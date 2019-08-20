const sequelize = require('sequelize')
const Op = sequelize.Op
const Users = require('../../models/UsersInfo')

module.exports = async (req, res) => {
    const query = req.query.q
    try {
        let result = await Users.findAll({
            where: {
                username: {
                    [Op.like]: '%' + query + '%'
                },
                [Op.and]: {
                    [Op.not]: { userId: req.user.id }
                }
            }
        })
        if (result.length > 0) {
            let data = result.map(item => {
                return {
                    id: item.dataValues.id.toString(),
                    name: item.dataValues.username
                }
            }
            )
            console.log(data)
            res.json(data)
        } else {
            res.json({})
        }


    } catch (error) {
        console.log(error)
    }

}