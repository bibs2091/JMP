const WishLists = require("../../models/WishLists");

module.exports = async (req, res) => {
    let course = await WishLists.findOne({
        where: {
            userId: req.user.id,
            courseId: req.params.id
        }
    });
    if (course) {
        await WishLists.destroy({
            where: {
                userId: req.user.id,
                courseId: req.params.id
            }
        });
    } else {
        await WishLists.create({
            userId: req.user.id,
            courseId: req.params.id
        }
        );
    }
    res.send({ success: true });
}