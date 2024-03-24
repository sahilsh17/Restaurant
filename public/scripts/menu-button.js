$(() => {
  $("#to-top").hide();
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#to-top:hidden").stop(true, true).fadeIn();
    } else {
      $("#to-top").stop(true, true).fadeOut();
    }
  });
  $('#back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},600);
    return false;
  });
});

