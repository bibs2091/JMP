function activateLoginButton() {
    if( (document.getElementById("email_login").value !=="") && (document.getElementById("password_login").value !=="") )
        { 
            console.log("moh");
           document.getElementById('submit-form').disabled = false; 
       } else { 
           document.getElementById('submit-form').disabled = true;
       }
   }
 $(".collapse-chapter").on("click",function(){
     $(this).next().slideToggle("slow");
 })

             //------ tags ------
 $(document).ready( function() {
    $("#tag-typer").keypress( function(event) {
      var key = event.which;
      if (key == 13 || key == 44){
       event.preventDefault();
       var tag = $(this).val();
        if(tag.length > 0){
          $("<span class='tag' style='display:none'><span class='close'>&times;</span>"+tag+" </span>").insertBefore(this).fadeIn(100);
          $(this).val("");
        }
      }
    });
    
    $("#tags").on("click", ".close", function() {
      $(this).parent("span").fadeOut(100);
    });
    
    $(".colors li").click(function() {
      var c = $(this).css("background-color");
      $(".tag").css("background-color",c);
      $("#title").css("color",c);
    });
    
  });