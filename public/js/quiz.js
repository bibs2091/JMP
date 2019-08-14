//show next step
var currentQuestion;
var numberOfQuestion = $("#quetions-length").html();
console.log(numberOfQuestion);
function nextQuest(obj) {
    console.log(obj);
    step = obj.getAttribute("data-step");
    //updating data-step value
    obj.setAttribute("data-step", parseInt(step) + 1);
    //hiding all questions
    $(".question").fadeOut();
    //showing the next question
    $("#question" + step).fadeIn();
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
//validate question radio