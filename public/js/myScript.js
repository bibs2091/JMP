//------------drop down profile ---------------//
var headerProfileAvatar = document.getElementById("avatarWrapper")
var headerProfileDropdownArrow = document.getElementById("dropdownWrapperArrow");
var headerProfileDropdown = document.getElementById("dropdownWrapper");

document.addEventListener("click", function (event) {
  var headerProfileDropdownClickedWithin = headerProfileDropdown.contains(event.target);

  if (!headerProfileDropdownClickedWithin) {
    if (headerProfileDropdown.classList.contains("active")) {
      headerProfileDropdown.classList.remove("active");
      headerProfileDropdownArrow.classList.remove("active");
    }
  }
});

headerProfileAvatar.addEventListener("click", function (event) {
  headerProfileDropdown.classList.toggle("active");
  headerProfileDropdownArrow.classList.toggle("active");
  event.stopPropagation();
});

//-----------------------------
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
var countSP = 0;
$(document).ready(function () {
  $("#plus_sponsor").click(function () {
    countSP = countSP + 1;
    if (countSP < 4) {
      $("#sponsorsToAdd").append(`<div class="add_sponsor">
          <div>
            <span>Name</span>
            <input type="text" class="form-control sponsorNameInput"  name="sponsorsName" id="sponsorName" required>
          </div>
          <div>
            <span>Logo</span>   
        <input type="file" name="logo" accept="image/*" id="sponsor-logo-input "required> 
          </div>
        </div> `);
      if (countSP == 2) {
        $("#submit-form-sponsor").css("margin-top", "22px")
      }
    }
  });
});
// ------------ delete sponsor ---------------
$(document).ready(function () {
  $("#delete_sponsor").click(function () {
    if (countSP > -1) {
      $("#sponsorsToAdd").children().last().remove();
      countSP = countSP - 1;
    }
  });
});
//---------------progress step (event) -------------
$('.steps').on('click', '.step--active', function () {
  $(this).removeClass('step--incomplete').addClass('step--complete');
  $(this).removeClass('step--active').addClass('step--inactive');
  $(this).next().removeClass('step--inactive').addClass('step--active');
});

$('.steps').on('click', '.step--complete', function () {
  $(this).removeClass('step--complete').addClass('step--incomplete');
  $(this).removeClass('step--inactive').addClass('step--active');
  $(this).nextAll().removeClass('step--complete').addClass('step--incomplete');
  $(this).nextAll().removeClass('step--active').addClass('step--inactive')
})
//----------- share -------------
$(document).ready(function () {
  //custom button for homepage
  $(".share-btn").click(function (e) {
    $('.networks-5').not($(this).next(".networks-5")).each(function () {
      $(this).removeClass("active");
    });

    $(this).next(".networks-5").toggleClass("active");
  });
});

//------------- lecture-nav ---------------
$(".lecture-nav").on("click", function () {
  $(this).next().slideToggle("fast");
  $(this).children(".fa-play").toggleClass("rotate90");
})

//----------------- catalog -----------------
var hidWidth;
var scrollBarWidths = 40;

var widthOfList = function () {
  var itemsWidth = 0;
  $('.list li').each(function () {
    var itemWidth = $(this).outerWidth();
    itemsWidth += itemWidth;
  });
  return itemsWidth;
};

var widthOfHidden = function () {
  return (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
};

var getLeftPosi = function () {
  return $('.list').position().left;
};

var reAdjust = function () {
  if (($('.wrapper').outerWidth()) < widthOfList()) {
    $('.scroller-right').show();
  }
  else {
    $('.scroller-right').hide();
  }

  if (getLeftPosi() < 0) {
    $('.scroller-left').show();
  }
  else {
    $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow');
    $('.scroller-left').hide();
  }
}

reAdjust();

$(window).on('resize', function (e) {
  reAdjust();
});

$('.scroller-right').click(function () {

  $('.scroller-left').fadeIn('slow');
  $('.scroller-right').fadeOut('slow');

  $('.list').animate({ left: "+=" + widthOfHidden() + "px" }, 'slow', function () {

  });
});

$('.scroller-left').click(function () {

  $('.scroller-right').fadeIn('slow');
  $('.scroller-left').fadeOut('slow');

  $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

  });
});


// ------------ next in event page ---------- //
function nextStep(currentDiv, currentStepNumber, nextDiv, nextStepNumber) {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  $('#' + currentDiv).hide();
  console.log('#' + nextDiv)
  $('#' + nextDiv).show();
  $(".step:nth-child(" + currentStepNumber + ")").removeClass("step--incomplete step--active")
  $(".step:nth-child(" + currentStepNumber + ")").addClass("step--complete step--inactive")
  $(".step:nth-child(" + nextStepNumber + ")").removeClass("step--incomplete step--inactive")
  $(".step:nth-child(" + nextStepNumber + ")").addClass("step--incomplete step--active")
}

//-----------------------------//

$('.datepicker').pickadate();
$('.timepicker').pickatime({
  twelvehour: false,
});
