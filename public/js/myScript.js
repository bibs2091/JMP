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
    //to hide the dropdown in case of click somewhere else
    navbar=document.getElementById("navbar");
    navbarDropActive=navbar.getElementsByClassName('active');
    for (let i=0;i<navbarDropActive.length;i++){
      navbarDropActive[i].classList.remove("active");
    }
  }
});
$(".dropdowns").click(function(){
  let dptarget = $(this).attr("data-id");
  document.getElementById(dptarget).classList.toggle("active");
  if(dptarget == "dropdownWrapper")
    headerProfileDropdownArrow.classList.toggle("active");
  event.stopPropagation();
})
// headerProfileAvatar.addEventListener("click", function (event) {
  
// });

//------------- course details ----------
$(".collapse-chapter").on("click", function () {
  $(this).next().slideToggle("slow");
  $(this).find(".fa-play").toggleClass("rotate90-v2");
});


//------ tags ------
$(document).ready(function () {
  $("#tag-typer").keypress(function (event) {
    var key = event.which;
    if (key == 13 || key == 44) {
      event.preventDefault();
      var tag = $(this).val();
      if (tag.length > 0 && tag.replace(/\s/g, '').length>0) {
        $("<span class='tag' style='display:none'><span class='close'>&times;</span><p>" + tag + "</p></span>").insertBefore(this).fadeIn(100);
        $(this).val("");
      }
    }
    addTagsAddEvent();
  });

  $("#tags").on("click", ".close", function () {
    $(this).parent("span").fadeOut(100);
    $(this).parent("span").remove();
    addTagsAddEvent();
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
  $('#' + nextDiv).show();
  $(".step:nth-child(" + currentStepNumber + ")").removeClass("step--incomplete step--active")
  $(".step:nth-child(" + currentStepNumber + ")").addClass("step--complete step--inactive")
  $(".step:nth-child(" + nextStepNumber + ")").removeClass("step--incomplete step--inactive")
  $(".step:nth-child(" + nextStepNumber + ")").addClass("step--incomplete step--active")
}

//-----------------------------//
