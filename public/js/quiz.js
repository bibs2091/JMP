//show next step
function nextQuest(step) {
    $(".question").fadeOut();
    $("#question" + step).fadeIn();
    $("#question-number").html(step);
    $(".step").eq(step - 1).addClass("active");
    $(".step").eq(step - 2).addClass("done");
}