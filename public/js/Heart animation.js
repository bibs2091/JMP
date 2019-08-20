$(function () {
  $(".heart").on("click", function () {
    wishlist($(this).attr("course"));
    $(this).toggleClass("is-active");
  });
});