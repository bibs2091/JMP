var stripePublicKey = "pk_test_4RClktcKizMFLAUQU9CxAKsu00wslY37cj";
var amount;
var stripHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: function (token) {
        fetch("/donate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                amount: amount
            })
        }).then(function (res) {
            return res.json()
        }).then(function (res) {
            console.log(res);
            alert("Succuessful payment")
        }).catch(function () {
            console.log("error")
        });
    }
});

function donate(price) {
    amount = parseFloat(price) * 100;
    console.log(amount);
    stripHandler.open({
        amount: amount
    });
}
