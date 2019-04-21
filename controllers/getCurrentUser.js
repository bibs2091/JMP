module.exports = (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send(false);
    }

}