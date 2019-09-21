const { stripeAPI } = require("../config/keys");

var stripeSecretKey = stripeAPI.secret;

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