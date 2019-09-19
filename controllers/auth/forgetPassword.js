const Users = require("../../models/Users");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await Users.findOne({where :{email}});
		if(!user){
			return res.render('auth.forgetPassword',{
				error : true
			})
		}
		const generated =  generatePassword();
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
        to: email,
        subject: 'Changing forgotten password- JMP',
        html: "<h1>Caution!</h1><p>Someone is trying to change your password, if its you your new pasword will be : "+generated+"  To confirm this action click here </p>http://localhost:3000/auth/generate/"+ user.id+"/"+ generated+"<h2>PS: for security improvement delete this email</h2>",
    };
    transport.sendMail(message, function (err, info) {
        if (err)
            return console.log(err);
    });
    return res.render("auth.forgetPassword",{
    	msg : true
    });

} catch (err) {
		console.log(err);
		res.render("auth.forgetPassword", {
			errors: [{ msg: "An error had occurred" }],
		});
	}
};
function generatePassword() {
    var length = 29,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}