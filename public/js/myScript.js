function activateLoginButton() {
  if ((document.getElementById("email_login").value !== "") && (document.getElementById("password_login").value !== "")) {
    console.log("moh");
    document.getElementById('submit-form').disabled = false;
  } else {
    document.getElementById('submit-form').disabled = true;
  }
}

//------------- course details ----------
$(".collapse-chapter").on("click", function () {
  $(this).next().slideToggle("slow");
})


//------ tags ------
$(document).ready(function () {
  $("#tag-typer").keypress(function (event) {
    var key = event.which;
    if (key == 13 || key == 44) {
      event.preventDefault();
      var tag = $(this).val();
      if (tag.length > 0) {
        $("<span class='tag' style='display:none'><span class='close'>&times;</span><p>" + tag + "</p></span>").insertBefore(this).fadeIn(100);
        $(this).val("");
      }
    }
  });

  $("#tags").on("click", ".close", function () {
    $(this).parent("span").fadeOut(100);
    $(this).parent("span").remove();
  });

  $(".colors li").click(function () {
    var c = $(this).css("background-color");
    $(".tag").css("background-color", c);
    $("#title").css("color", c);
  });

});



// ----------- add sponsor ------------
var countSP=0;
$(document).ready(function(){
  $("#plus_sponsor").click(function(){
    countSP=countSP + 1;
    if (countSP <4){
    $("#sponsorsToAdd").append("<div class='add_sponsor'><div><span>Name</span><input type='text' class='form-control sponsorNameInput'  name='title' id='sponsorName'></div><div><span>Logo</span><button type='button' class='btn btn-secondary uploadPicSponsor'>Upload photo</button></div></div>");
    if (countSP ==2){
      $("#submit-form-sponsor").css("margin-top","22px")
    }
  }});
});
// ------------ delete sponsor ---------------
$(document).ready(function(){
$("#delete_sponsor").click(function(){
  if (countSP > -1){
  $("#sponsorsToAdd").children().last().remove();
  countSP= countSP -1;
}});
});
//----------- share -------------
$( document ).ready(function() {
	//custom button for homepage
     $( ".share-btn" ).click(function(e) {
     	 $('.networks-5').not($(this).next( ".networks-5" )).each(function(){
         	$(this).removeClass("active");
    	 });
     
            $(this).next( ".networks-5" ).toggleClass( "active" );
    });   
});

//------------- lecture-nav ---------------
$(".lecture-nav").on("click", function () {
  $(this).next().slideToggle("fast");
  $(this).children(".fa-play").toggleClass("rotate90");
})
