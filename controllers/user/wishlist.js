module.exports = (req, res) => {
    res.render("user.wishlist", {
        pageName: "My Wishlist",
        pageTitle: "My Wishlist - JMP"
    });
}