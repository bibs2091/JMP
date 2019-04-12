const Categories = require('../../models/Categories');
const fs = require('fs');

module.exports = (req, res) => {
    Categories.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        fs.unlink(__dirname + '/../../public/categories/' + req.params.id + ".jpg", function (error) {
            if (error) {
                console.log(error);
            }
            return res.send({ success: true });
        });
    });

}