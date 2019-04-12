const Categories = require('../../models/Categories');
const fs = require('fs');

module.exports = (req, res) => {
    const { image } = req.files;
    //delete old pic
    fs.unlink(__dirname + '/../../public/categories/' + req.params.id + ".jpg", function (error) {
        image.mv(__dirname + "/../../public/categories/" + req.params.id + ".jpg",
            (err) => {
                if (err) {
                    console.log(err)
                }
                Categories.update(
                    req.body,
                    { where: { id: req.params.id } }
                ).then(() => {
                    res.redirect("/admin/categories");
                });
            });
    });
    //add the new pic

    //update category infos

};