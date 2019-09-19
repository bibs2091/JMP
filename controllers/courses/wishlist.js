const WishLists = require("../../models/WishLists");
const axios = require('axios')

module.exports = async (req, res) => {
    try {
        let course = await WishLists.findOne({
            where: {
                userId: req.user.id,
                courseId: req.params.id
            }
        });
        if (course) {
            //dislike
            await axios.post(`http://localhost:3000/recSys/dislikedCourse/${req.params.id}`)
            await WishLists.destroy({
                where: {
                    userId: req.user.id,
                    courseId: req.params.id
                }
            });
        } else {
            //like
            console.log('ready to like course')
            await axios.post(`http://localhost:3000/recSys/likedCourse/${req.params.id}`)
            await WishLists.create({
                userId: req.user.id,
                courseId: req.params.id
            }
            );
        }
        res.send({ success: true });
    }
    catch{
        res.redirect("/error");
    }
}