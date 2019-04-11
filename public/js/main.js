// profile page show tabs
function showTab(self, id) {
    $('.profile-tab').hide();
    $("#profile-" + id).fadeIn();
    $(".profile-menu-item").removeClass("pmi-active");
    self.classList.add("pmi-active");
}
//trigger input by id
function triggerInput(id) {
    document.getElementById(id).click();
}
