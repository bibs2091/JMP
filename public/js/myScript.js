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


