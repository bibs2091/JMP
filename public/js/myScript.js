function activateLoginButton() {
    if( (document.getElementById("email_login").value !=="") && (document.getElementById("password_login").value !=="") )
        { 
            console.log("moh");
           document.getElementById('submit-form').disabled = false; 
       } else { 
           document.getElementById('submit-form').disabled = true;
       }
   }



   function activateRegisterButton() {
    if( (document.getElementsByName("firstName")[0].value !=="") && (document.getElementsByName("lastName")[0].value !=="") &&
    (document.getElementsByName("userName")[0].value !=="") && (document.getElementsById("email_register").value !=="") 
    (document.getElementsById("password_register").value !=="") && (document.getElementsByName("password_conf")[0].value !=="") )
        { 
            console.log("moh");
           document.getElementById('submit-form').disabled = false; 
       } else { 
           document.getElementById('submit-form').disabled = true;
       }
   }