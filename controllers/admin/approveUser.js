const Users = require("../../models/Users");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    Users.update({ groupId: 2 }, { where: { id: req.params.id } });
    var info = await Users.findByPk(req.params.id);
    let transport = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'jmpsitetest@gmail.com',
            pass: 'jmppassjmp'
        }
    });

    const message = {
        from: 'jmpsitetest@gmail.com',
        to: info.email,
        subject: 'You account confirmation - JMP',
        html: "<h1>Congratulation!</h1><p>Your account has been approved by <b>JMP</b> admins, Now you are able to use the website with all its functionalities</p><a href='http://localhost:3000/auth/login'",
    };
    transport.sendMail(message, function (err, info) {
        if (err)
            return console.log(err);
    });
    res.send({ success: true });
}