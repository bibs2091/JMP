var stripeSecretKey = "sk_test_BUMpiBazZ0J0XUVVEFdVHoHa00gDSNuRcr";
var stripePublicKey = "pk_test_4RClktcKizMFLAUQU9CxAKsu00wslY37cj";

const stripe = require("stripe")(stripeSecretKey);

module.exports = async (req, res) => {
    stripe.charges.create({
        amount: req.body.amount,
        source: req.body.stripeTokenId,
        currency: 'usd'
    }).then(() => {
        console.log("payment done !")
        res.json({ success: true })
    }).catch((err) => {
        console.log("error !" + err);
        res.status(500).end()
    });
}