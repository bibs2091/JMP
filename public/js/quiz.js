//show next step
var currentQuestion = document.getElementById("question1");
var numberOfQuestion = $("#quetions-length").html();
console.log(numberOfQuestion);
function nextQuest(obj) {
    console.log(obj);
    step = obj.getAttribute("data-step");
    //updating data-step value
    obj.setAttribute("data-step", parseInt(step) + 1);
    //hiding all questions
    currentQuestion.classList.add("animated", "zoomOutLeft", "delay-2s");
    currentQuestion.style.display = "none";
    //showing the next question
    $("#question" + step).addClass("animated zoomInRight").show();
    //updating current question number
    $("#question-number").html(step);
    $(".step").eq(step - 1).addClass("active");
    $(".step").eq(step - 2).addClass("done");
    //saving the current question
    currentQuestion = document.getElementById("question" + step);
    //displaying submit button for the last question
    if (step == numberOfQuestion) {
        $("#quiz-next").hide();
        $("#quiz-submit").show();
    }
}
//showing the quiz result
function quizResult() {
    $(".question").hide();
    $(".quiz-btm-btns").hide();
    $("#quiz-result").addClass("animated jackInTheBox").show();
}