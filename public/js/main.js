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
    mscConfirm("Delete", "Are you sure you want to delete this category?", function () {
        $.ajax({
            url: '/admin/category/delete/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (result) {
                location.reload();
            }
        });
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
function tagsJSON() {
    var tagsElems = document.getElementsByClassName("tag");
    var tags = [];
    for (let i = 0; i < tagsElems.length; i++) {
        let elem = tagsElems[i].getElementsByTagName("p")[0].innerHTML;
        tags.push(elem);
    }
    return JSON.stringify(tags);
}
// add courses JSON to the add course form
function addJSONtoForm() {
    quizsJSON();
    let json = courseJSON();
    var tags = tagsJSON();
    document.getElementById("courseJSON").value = json;
    document.getElementById("tag-typer").value = tags;
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

        }
    });
}
//enable toolips every where
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//get all chapters
function getChaps() {
    var container = document.getElementById("chapters-list");
    var elems = container.getElementsByClassName("chapter-title");
    var chaps = [];
    for (let i = 0; i < elems.length; i++) {
        chaps.push(elems[i].getElementsByTagName("h6")[0].innerHTML);
    }
    return chaps;
}
//print chapters
function printChaps() {
    var chaps = getChaps();
    var container = document.getElementById("chapters-list2");
    container.innerHTML = "";
    for (let i = 0; i < chaps.length; i++) {
        var HTML = `
        <li>
            <div class="chapter-title">
                <h6>${chaps[i]}</h6>
            </div>
            <div class='add-lecture' >
                    <div class="quiz-data" style="display:none"></div>
                    <ul> <li class="lecture" style="display:none">
                    <h5>quiz</h5>
                    <div class="tools">
                        <i class="far fa-trash-alt" onclick='deleteQuiz(this)'></i>&nbsp;
                        <i class="far fa-edit" onclick="updateQuiz(${i})"></i>
                    </div>
                </li>
                    <li class="lesson addLesson" onclick='showAddQuizModal(${i})'>
                        <p style="display:block; margin:0 auto; color:#868686;">
                            <i class="fas fa-plus"></i> &nbsp; 
                            Add a quiz
                        </p></li>
                    </ul>
            </div>

        </li>
        `;
        container.innerHTML += HTML;
    }
}
//generate question card html
function questionCardHTML(number) {
    var html = `
    <div class="question-card" style="position:relative">
        <span class="close-category-modal" onclick="deleteQuestion(this)">&times;</span>
        Question <span class="question-number">${number}</span>
        <br><br>
        <div class="container">
            <input type="text" class="form-group quiz-title-input" 
            placeholder="Enter title here" onkeyup="saveInputState(this)">                        
            <div class="suggestions">
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="0" checked>
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="a- option 1" style="width: 95%">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="1">
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="b- option 2" style="width: 95%">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="2">
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="c- option 3" style="width: 95%">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="3">
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="d- option 4" style="width: 95%">
                </div>
            </div>
        </div>
    </div>
    `
    return html;
}
function questionCardHTMLo(number, title, s, answer) {
    var html = `
    <div class="question-card" style="position:relative">
        <span class="close-category-modal" onclick="deleteQuestion(this)">&times;</span>
        Question <span class="question-number">${number}</span>
        <br><br>
        <div class="container">
            <input type="text" class="form-group quiz-title-input" 
            placeholder="Enter title here" onkeyup="saveInputState(this)" value="${title}">                        
            <div class="suggestions">
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="0" `;
    if (answer == 0)
        html += "checked";
    html += `>
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="a- option 1" style="width: 95%" value="${s[0]}">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="1"`;
    if (answer == 1)
        html += "checked";
    html +=
        `>
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="b- option 2" style="width: 95%" value="${s[1]}">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="2"`;
    if (answer == 2)
        html += "checked";
    html += `>
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="c- option 3" style="width: 95%" value="${s[2]}">
                </div>
                <div class="suggestion">
                    <input type="radio" name="answer${number} " onchange="saveRadioState(this)"
                    style="margin-right: 7px;" value="3"`;
    if (answer == 3)
        html += "checked";
    html += `>
                    <input type="text" class="quiz-title-input" onkeyup="saveInputState(this)"
                        placeholder="d- option 4" style="width: 95%" value="${s[3]}">
                </div>
            </div>
        </div>
    </div>
    `
    return html;
}
// add a question card
function addQuestion() {
    var number = document.getElementsByClassName("question-card").length + 1;
    document.getElementById("question-cards").innerHTML += questionCardHTML(number);
}
//reset question numbers
function resetQuestionNumbers() {
    var cards = document.getElementsByClassName("question-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].getElementsByClassName("question-number")[0].innerHTML = i + 1;
    }
}
//delete a question card 
function deleteQuestion(obj) {
    if (document.getElementsByClassName("question-card").length > 1) {
        obj.parentNode.remove();
        resetQuestionNumbers();
    }
}
//reset the add quiz modal
function resetAddQuizModal() {
    document.getElementById("question-cards").innerHTML = questionCardHTML(1);
}
var whereToAddQuizIndex;
//show add quiz modal
function showAddQuizModal(i) {
    whereToAddQuizIndex = i;
    resetAddQuizModal();
    showModal("add-quiz-modal");
}
//adding chapter quiz data
function addChapQuiz(obj) {
    //selecting the place where to put data
    var container = obj.parentNode.parentNode;
    var addAreas = document.getElementsByClassName("quiz-data");
    var place = addAreas[whereToAddQuizIndex];
    var buffer1 = place.nextElementSibling.children
    var addBtn = buffer1[1];
    var quizBtn = buffer1[0];
    $(addBtn).hide();
    $(quizBtn).show();
    //selecting the quiz's data
    var cardsContainer = container.getElementsByTagName("div")[0];
    var cards = cardsContainer.children;
    var chapQuiz = [];

    for (let i = 0; i < cards.length; i++) {
        let inputs = cards[i].getElementsByTagName("input");
        let answer;
        for (let i = 1; i < inputs.length; i += 2) {
            if (inputs[i].checked) {
                answer = inputs[i].value;
            }
        }
        let question = {
            title: inputs[0].value,
            answer: answer,
            suggestions: [inputs[2].value, inputs[4].value, inputs[6].value, inputs[8].value]
        }
        chapQuiz.push(question);
    }
    place.innerHTML = JSON.stringify(chapQuiz);
    hideModal("add-quiz-modal");
}
// saving quiz inputs state
//the text inputs
function saveInputState(obj) {
    $(obj).attr("value", $(obj).val());
}
//the radio inputs
function saveRadioState(obj) {
    $(obj).attr("checked", true);
}
// add quizs json to the form
function quizsJSON() {
    var quizsElems = document.getElementsByClassName("quiz-data");
    var quizs = [];
    for (let i = 0; i < quizsElems.length; i++) {
        quizs.push(JSON.parse(quizsElems[i].innerHTML));
    }
    console.log(quizs);
    let json = JSON.stringify(quizs);
    document.getElementById("quizsJSON").value = json;
}
//delete quiz
function deleteQuiz(obj) {
    var buffer = obj.parentNode.parentNode;
    buffer.parentNode.previousElementSibling.innerHTML = "";
    $(buffer).hide();
    $(buffer.nextElementSibling).show();
}
//update quiz
function updateQuiz(i) {
    whereToAddQuizIndex = i;
    //getting the add quiz modal
    var cardsArea = document.getElementById("question-cards");
    cardsArea.innerHTML = "";
    //getting the data
    var data = document.getElementsByClassName("quiz-data")[i].innerHTML;
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        let title = data[i].title;
        let suggs = data[i].suggestions;
        let answer = data[i].anwser;
        cardsArea.innerHTML += questionCardHTMLo(i + 1, title, suggs, answer);
    }
    showModal("add-quiz-modal");
}
//add schedule modal
function showAddSchedModal() {
    showModal("add-schedule-modal");
}