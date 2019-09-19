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
            // await axios.post(`http://5cc87506.ngrok.io/recSys/dislikedCourse/${req.params.id}`,
            //     { withCredentials: true })
            await WishLists.destroy({
                where: {
                    userId: req.user.id,
                    courseId: req.params.id
                }
            });
        } else {
            //like
            console.log(req.params)
            console.log('ready to like course')
            // await axios.post(`http://5cc87506.ngrok.io/recSys/likedCourse/${req.params.id}`,
            //     { withCredentials: true })
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