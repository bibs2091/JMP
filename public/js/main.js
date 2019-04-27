var currentUser;
var whereToAddLecture = {};
var chapterToEdit = {};
var lectureToEdit = {};
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
    chapterHTML += "<div class='chapter-title'><h6>" + title + "</h6><div class='tools'><i class='far fa-trash-alt' onclick='deleteChapter(this)'></i>&nbsp;<i class='far fa-edit' onclick='showEditChapterModal(this)'></i></div>";
    chapterHTML += `</div><ul class='lectures'></ul>
    <div class='add-lecture' onclick='showAddLectureModal(this)'>
    <ul> <li class="lesson addLesson">
        <p style="display:block; margin:0 auto; color:#868686;">
            <i class="fas fa-plus"></i> &nbsp; 
            Add a lesson
        </p></li>
    </ul>
    </div>
    </li>`;
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
    lectureHTML += "<div class='tools'><i class='far fa-trash-alt' onclick='deleteLecture(this)'></i>&nbsp;";
    lectureHTML += "<i class='far fa-edit' onclick='showEditLectureModal(this)'></i></div></li>";
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
// show edit chapter modal
function showEditChapterModal(obj) {
    chapterToEdit = obj.parentNode.parentNode;
    var modal = document.getElementById("edit-chapter-modal");
    var input = modal.getElementsByTagName("input")[0];
    var value = chapterToEdit.getElementsByTagName("h6")[0].innerHTML;
    input.value = value;
    showModal("edit-chapter-modal");
}
//edit chapter
function editChapter(obj) {
    var value = obj.parentNode.parentNode.getElementsByTagName("input")[0].value;
    chapterToEdit.getElementsByTagName("h6")[0].innerHTML = value;
    hideModal("edit-chapter-modal");
}
//show edit lecture modal
function showEditLectureModal(obj) {
    lectureToEdit = obj.parentNode.parentNode;
    var modal = document.getElementById("edit-lecture-modal");
    var inputs = modal.getElementsByTagName("input");
    var childs = lectureToEdit.children;
    var title = childs[0].innerHTML;
    var type = childs[1].innerHTML;
    var description = childs[2].innerHTML;
    var link = childs[3].innerHTML;
    inputs[0].value = title;
    inputs[1].value = link;
    modal.getElementsByTagName("textarea")[0].innerHTML = description;
    modal.getElementsByTagName("select")[0].value = type;
    showModal("edit-lecture-modal");
}
// edit lecture 
function editLecture(obj) {
    var modal = obj.parentNode;
    var title = modal.getElementsByTagName("input")[0].value;
    var link = modal.getElementsByTagName("input")[1].value;
    var description = modal.getElementsByTagName("textarea")[0].innerHTML;
    var type = modal.getElementsByTagName("select")[0].value;
    var childs = lectureToEdit.children;
    childs[0].innerHTML = title;
    childs[1].innerHTML = type;
    childs[2].innerHTML = description;
    childs[3].innerHTML = link;
    hideModal("edit-lecture-modal");
}
//course items to json
function courseJSON() {
    var chaptersList = document.getElementById("chapters-list");
    var chapters = chaptersList.children;
    var chaptersArray = [];
    for (var i = 0; i < chapters.length; i++) {
        var obj = {};
        obj.title = chapters[i].firstElementChild.firstElementChild.innerHTML;
        var lecturesArray = [];
        var lectures = chapters[i].getElementsByClassName("lecture");
        var lectureChilds = [];
        for (var j = 0; j < lectures.length; j++) {
            var lecObj = {};
            lectureChilds = lectures[j].children;
            lecObj.title = lectureChilds[0].innerHTML;
            lecObj.type = lectureChilds[1].innerHTML;
            lecObj.description = lectureChilds[2].innerHTML;
            lecObj.link = lectureChilds[3].innerHTML;
            lecturesArray.push(lecObj);
        }
        obj.lectures = lecturesArray;
        chaptersArray.push(obj);
    }
    return JSON.stringify(chaptersArray);
}
// add courses JSON to the add course form
function addJSONtoForm() {
    let json = courseJSON();
    document.getElementById("courseJSON").value = json;
    console.log(json);
}
//Delete Course by id
function deleteCourse(id) {
    $.ajax({
        url: '/courses/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (result) {
            location.replace("/coach/courses");
        }
    });
}
//get current user
function getCurrentUser() {
    $.ajax({
        url: '/getuser',
        method: 'GET',
        contentType: 'application/json',
        success: function (result) {
            currentUser = result.id;
        }
    });
}
// add/remove courses wishlist
function wishlist(id) {
    $.ajax({
        url: '/courses/wishlist/' + id,
        method: 'POST',
        contentType: 'application/json',
        success: function (result) {
            alert("done");
        }
    });
}