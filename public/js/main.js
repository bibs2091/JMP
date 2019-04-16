var whereToAddLecture = {};
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
//show modal by id
function showModal(id) {
    $("#" + id).fadeIn();
}
//hide modal by id
function hideModal(id) {
    $("#" + id).fadeOut();
}
//loadimaga from input by id
function loadImage(event, id) {
    var output = document.getElementById(id);
    output.src = URL.createObjectURL(event.target.files[0]);
}
//get category data
$(".get-category").click(function () {
    var categoryId = $(this).attr('id');
    $.get("/admin/category/" + categoryId, function (data, status) {
        $("#update-category-image").attr("src", data.cover);
        $("#update-category-modal input[name='title']").val(data.title);
        $("#update-category-modal textarea").val(data.description);
        $("#update-category-modal .delete-button").attr("id", data.id);
        $("#update-category-modal .info-container").attr("action", "/admin/category/update/" + data.id);
        showModal("update-category-modal");
    });
});

//Delete category by id
function deleteCategory(id) {
    $.ajax({
        url: '/admin/category/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (result) {
            location.reload();
        }
    });
}
/*add chapter*/
function addChapter(obj) {
    var title = obj.parentNode.parentNode.getElementsByTagName("input")[0].value;
    var chapterHTML = "<li>";
    chapterHTML += "<div class='chapter-title'><h6>" + title + "</h6><div class='tools'><i class='fa fa-times' onclick='deleteChapter(this)'></i>&nbsp;<i class='fa fa-edit'></i></div>";
    chapterHTML += "</div><ul class='lectures'></ul><div class='add-lecture' onclick='showAddLectureModal(this)'><img src=''></div></li>";
    document.getElementById("chapters-list").innerHTML += chapterHTML;
    hideModal("add-chapter-modal");
}
// add lecture modal

function showAddLectureModal(obj) {
    whereToAddLecture = obj.parentNode.getElementsByClassName("lectures")[0];
    showModal("add-lecture-modal");
}
//add lecture
function addLecture(obj) {
    // inputs values
    var inputs = obj.getElementsByTagName("input");
    var title = inputs[0].value;
    var link = inputs[1].value;
    var description = obj.getElementsByTagName("textarea")[0].value;
    var type = obj.getElementsByTagName("select")[0].value;
    var lectureHTML = "<li class='lecture'>";
    lectureHTML += "<h5>" + title + "</h5><span>" + type + "</span>";
    lectureHTML += "<p>" + description + "</p><h6>" + link + "</h6>";
    lectureHTML += "<div class='tools'><i class='fa fa-times' onclick='deleteLecture(this)'></i>&nbsp;";
    lectureHTML += "<i class='fa fa-edit'></i></div></li>";
    whereToAddLecture.innerHTML += lectureHTML;
    hideModal("add-lecture-modal");
}
// delete chapter
function deleteChapter(obj) {
    $(obj).parent().parent().parent().remove();
}
//delete lecture
function deleteLecture(obj) {
    $(obj).parent().parent().remove();
}
