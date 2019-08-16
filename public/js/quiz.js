//show next step
var currentQuestion = document.getElementById("question1");
var numberOfQuestion = $("#quetions-length").html();
function nextQuest(obj) {
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
function showQuizResult() {
    $(".question").hide();
    $(".quiz-btm-btns").hide();
    $("#quiz-result").addClass("animated jackInTheBox").show();
    $("#question-number").parent().html("Result");
}
//generating emojis HTML
function emojiHTML(name) {
    var html;
    if (name == "like") {
        html = `<div class="emoji  emoji--like">
        <div class="emoji__hand">
            <div class="emoji__thumb"></div>
        </div>
      </div>`;
    } else if (name == "love") {
        html = `<div class="emoji  emoji--love">
        <div class="emoji__heart"></div>
      </div>`;
    } else if (name == "angry") {
        html = `<div class="emoji  emoji--angry">
        <div class="emoji__face">
          <div class="emoji__eyebrows"></div>
          <div class="emoji__eyes"></div>
          <div class="emoji__mouth"></div>
        </div>
      </div>`;
    } else if (name == "sad") {
        html = `<div class="emoji  emoji--sad">
        <div class="emoji__face">
          <div class="emoji__eyebrows"></div>
          <div class="emoji__eyes"></div>
          <div class="emoji__mouth"></div>
        </div>
      </div>`;
    }
    return html;
}
//calculating and showing the result
function quizResult(quizId) {
    var questions = $(".question");
    var answers = [];
    for (let i = 0; i < questions.length - 1; i++) {
        let answer = {
            questionId: questions[i].getAttribute("question-id")
        };
        //getting the inputs
        let inputs = questions[i].getElementsByTagName("input");
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                answer.answer = inputs[j].value;
                break;
            }
        }
        answers.push(answer)
    }
    $.ajax({
        url: `/api/quiz/${quizId}/result`,
        method: 'POST',
        data: {
            answers: answers
        },
        success: function (result) {
            console.log(result);
            $(".percentage span").html(result.percentage);
            $(".quiz-observation h6").html(result.rate);
            $(".quiz-observation p").html(result.remark);
            $("#triangle").css("padding-left", result.percentage + '%');
            $("#emoji-place").html(emojiHTML(result.emoji))
            showQuizResult();
        }
    });
}
//choose only one option in quiz
$(".quiz input").on("click", function () {
    var inputs = $(this).parent().siblings();
    for (let i = 2; i < inputs.length; i++) {
        let checkbox = inputs[i].children[0];
        checkbox.checked = false;
    }
})