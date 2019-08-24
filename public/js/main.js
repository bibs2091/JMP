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
    chapterHTML += "<div class='chapter-title' onclick='showEditChapterModal2(this)'><h6>" + title + "</h6><div class='tools'><i class='far fa-trash-alt' onclick='deleteChapter(this)'></i>&nbsp;<i class='far fa-edit' onclick='showEditChapterModal(this)'></i></div>";
    chapterHTML += `</div><ul class='lectures'></ul>
    <div class='add-lecture' data-toggle='modal' data-target='#add-lecture-modal' onclick='showAddLectureModal(this)'>
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
    // showModal("add-lecture-modal");
}
//add lecture
function addLecture(obj) {
    // inputs values
    console.log(obj);

    var inputs = obj.getElementsByTagName("input");
    var title = inputs[0].value;
    var link = inputs[1].value;
    var description = obj.getElementsByTagName("textarea")[0].value;
    var type = obj.getElementsByTagName("select")[0].value;
    var lectureHTML = "<li class='lecture' onClick='showEditLectureModal2(this)'  data-toggle='modal' data-target='#edit-lecture-modal' >";
    lectureHTML += "<h5>" + title + "</h5><span>" + type + "</span>";
    lectureHTML += "<p>" + description + "</p><h6>" + link + "</h6>";
    lectureHTML += "<div class='tools'><i class='far fa-trash-alt' onclick='deleteLecture(this);event.stopPropagation();'></i>&nbsp;";
    lectureHTML += "<i class='far fa-edit' onclick='showEditLectureModal(this)'  data-toggle='modal' data-target='#edit-lecture-modal'></i></div></li>";
    whereToAddLecture.innerHTML += lectureHTML;
    // hideModal("add-lecture-modal");
}
// delete chapter
function deleteChapter(obj) {
    $(obj).parent().parent().parent().remove();
}
//delete lecture
// $("i").on("click", function(){
//     console.log( "I was clicked, but my parent will not be." );

//     // event.stopPropagation();
//   });
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
function showEditChapterModal2(obj) {
    chapterToEdit = obj;
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
    // showModal("edit-lecture-modal");
}
function showEditLectureModal2(obj) {
    lectureToEdit = obj
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
    // showModal("edit-lecture-modal");
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
    // hideModal("edit-lecture-modal");
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
    valideQuiz();
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
    let json = JSON.stringify(quizs);
    document.getElementById("quizsJSON").value = json;
}
//delete quiz
function deleteQuiz(obj) {
    var buffer = obj.parentNode.parentNode;
    buffer.parentNode.previousElementSibling.innerHTML = "";
    $(buffer).hide();
    $(buffer.nextElementSibling).show();
    valideQuiz()
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
//generating schedule item card html
function scheduleCardHTML(number) {
    let html = `
    <div class="schedule-card" style="position:relative">
        <span class="close-category-modal" onclick="deleteSchedule(this)">&times;</span>
        Item <span class="schedule-number">${number}</span> 
        <br><br>
        <div class="md-form form-md">
            <input type="text" placeholder="Describe this item in the Schedule" 
            onkeyup="saveInputState(this)" class="form-control form-control-lg">
            <label class="active">Item name</label>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="md-form form-md">
                <input type="text" placeholder="Select a date" 
                onkeyup="saveInputState(this)" class="form-control form-control-lg datepicker">
                <label class="active">Start day</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="md-form form-md">
                <input type="text" placeholder="Select a date" 
                onkeyup="saveInputState(this)" class="form-control form-control-lg timepicker">
                <label class="active">Start time</label>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
}
//add schedule item card
function addScheduleCard() {
    var number = document.getElementsByClassName("schedule-card").length + 1;
    document.getElementById("schedule-cards").innerHTML += scheduleCardHTML(number);
}
//delete schedule card 
function deleteSchedule(obj) {
    if (document.getElementsByClassName("schedule-card").length > 1) {
        obj.parentNode.remove();
        resetScheduleNumbers();
    }
}
//reset schedule numbers
function resetScheduleNumbers() {
    var cards = document.getElementsByClassName("schedule-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].getElementsByClassName("schedule-number")[0].innerHTML = i + 1;
    }
}
//saving schedule as json
function saveSchedule() {
    var cards = document.getElementsByClassName("schedule-card");
    var schedule = [];
    var addSchedule= document.getElementById("add-schedule");
    for (let i = 0; i < cards.length; i++) {
        var inputs = cards[i].getElementsByTagName("input");
        schedule.push({
            name: inputs[0].value,
            startDate: inputs[1].value,
            startTime: inputs[2].value,
        });
    }
    $("#scheduleJSON-input").val(JSON.stringify(schedule));
    hideModal('add-schedule-modal');
    addSchedule.innerHTML="Change Schedule";
    // addSchedule.classList.add("saved_animation");
}
var saveAnimation = function(buttonID) {
    console.log(buttonID);
    button=document.getElementById(buttonID);
    button.innerHTML = 'Saving <span class="spinner"></span>';    
    // Simulate successful AJAX call
    setTimeout(function(){
      button.innerHTML = 'Change Schedule';
      button.classList.add('done');
    }, 1000);
    button.classList.remove("done");

  };
//add sponsor item card
function addSponsorCard() {
    var number = document.getElementsByClassName("sponsor-card").length + 1;
    document.getElementById("sponsor-cards").innerHTML += sponsorCardHTML(number);
}
//reset sponsor numbers
function resetSponsorNumbers() {
    var cards = document.getElementsByClassName("sponsor-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].getElementsByClassName("sponsor-number")[0].innerHTML = i + 1;
    }
}
//generating sponsor card html
function sponsorCardHTML(number) {
    let html = `<div class="sponsor-card" style="position:relative">
    <span class="close-category-modal" onclick="deleteSponsor(this)">&times;</span>
    Sponsor <span class="sponsor-number">${number}</span> 
    <br><br>
    <div class="md-form form-md">
      <input type="text" placeholder="The name of the sponsor" 
      onkeyup="saveInputState(this)" class="form-control form-control-lg">
      <label class="active">Sponsor name</label>
    </div>
    <div class="md-form">
      <div class="file-field">
        <a class="btn-floating mt-0 float-left">
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
            <path d="M30.8384 9.21571C30.4855 7.11886 29.4473 5.20522 27.8593 3.75303C26.095 2.13798 23.8014 1.24902 21.4127 1.24902C19.5669 1.24902 17.7687 1.77833 16.2283 2.77586C14.9457 3.60374 13.8803 4.72342 13.1271 6.03989C12.8014 5.97882 12.4621 5.94489 12.1228 5.94489C9.23874 5.94489 6.89081 8.29282 6.89081 11.1768C6.89081 11.5501 6.93152 11.9097 6.99938 12.2626C5.13325 13.6198 4 15.8049 4 18.1324C4 20.0121 4.69895 21.8375 5.97471 23.283C7.28439 24.7623 9.01481 25.6377 10.8606 25.7395C10.8809 25.7395 10.8945 25.7395 10.9149 25.7395H16.7508C17.2597 25.7395 17.6669 25.3323 17.6669 24.8234C17.6669 24.3144 17.2597 23.9073 16.7508 23.9073H10.942C8.16656 23.7376 5.8322 21.0979 5.8322 18.1256C5.8322 16.2052 6.86366 14.4137 8.52622 13.4433C8.91302 13.2194 9.07588 12.7512 8.92659 12.3305C8.79087 11.964 8.72301 11.5772 8.72301 11.1633C8.72301 9.29036 10.2498 7.76352 12.1228 7.76352C12.5231 7.76352 12.9167 7.83138 13.2832 7.9671C13.731 8.12996 14.2264 7.92638 14.43 7.49887C15.699 4.80485 18.4405 3.06765 21.4195 3.06765C25.4232 3.06765 28.7279 6.06704 29.108 10.0436C29.1487 10.4575 29.4608 10.79 29.868 10.8579C32.8877 11.3736 35.1678 14.1627 35.1678 17.3453C35.1678 20.7179 32.5145 23.6494 29.2437 23.9005H24.2424C23.7335 23.9005 23.3263 24.3076 23.3263 24.8166C23.3263 25.3255 23.7335 25.7327 24.2424 25.7327H29.2776C29.298 25.7327 29.3183 25.7327 29.3455 25.7327C31.4152 25.5834 33.3492 24.6334 34.7878 23.0454C36.2196 21.4711 37 19.4489 37 17.3453C36.9932 13.5384 34.3942 10.1522 30.8384 9.21571Z" fill="#333333"/>
            <path d="M26.0003 19.0015C26.3599 18.6419 26.3599 18.0651 26.0003 17.7054L21.1483 12.8535C20.9787 12.6838 20.7412 12.582 20.5037 12.582C20.2661 12.582 20.0286 12.677 19.859 12.8535L15.007 17.7054C14.6474 18.0651 14.6474 18.6419 15.007 19.0015C15.1835 19.178 15.421 19.273 15.6517 19.273C15.8824 19.273 16.1199 19.1847 16.2964 19.0015L19.5876 15.7103V30.8362C19.5876 31.3451 19.9947 31.7523 20.5037 31.7523C21.0126 31.7523 21.4198 31.3451 21.4198 30.8362V15.7103L24.7109 19.0015C25.0638 19.3612 25.6406 19.3612 26.0003 19.0015Z" fill="#333333"/>
            </g>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="41" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
            </svg>
            
          <input type="file" accept="images/*" name="sponsorImage">
        </a>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" placeholder="Upload your file">
        </div>
      </div>
    </div>
</div>`;
    return html;
}
//delete sponsor card
function deleteSponsor(obj) {
    if (document.getElementsByClassName("sponsor-card").length > 1) {
        obj.parentNode.remove();
        resetSponsorNumbers();
    }
}
//saving sponsors names as json
function saveSponsors() {
    var cards = document.getElementsByClassName("sponsor-card");
    var sponsors = [];
    for (let i = 0; i < cards.length; i++) {
        var inputs = cards[i].getElementsByTagName("input");
        sponsors.push(inputs[0].value);
    }
    $("#sponsorsJSON-input").val(JSON.stringify(sponsors));
    hideModal('add-sponsor-modal');
}
// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').materialSelect();
});
//Add Course Validation Step 1Ò
function ACVS1() {
    console.log("lm")
    var nextBtn = document.querySelector("#basic-info button");
    if ($("#basic-info textarea").eq(0).val() == "") {
        nextBtn.disable = true;
        return;
    }
    var inputs = $("#basic-info input");
    if (inputs[0].value == "" || inputs[1].value == "") {
        nextBtn.disable = true;
        return;
    }
    if (inputs[2].value == "Course's category" || inputs[3].value == "Course's level") {
        nextBtn.disable = true;
        return;
    }

    nextBtn.disabled = false;
}
//validating quizs before submit
function valideQuiz() {
    var submitBtn = document.querySelector("#quizs-content button");
    var datas = document.getElementsByClassName("quiz-data");

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].innerHTML == "") {
            submitBtn.disabled = true;
            return;
        }
    }
    submitBtn.disabled = false;
}