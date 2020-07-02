console.log('hello world!')
console.log($('.header'))

$(document).ready(function(){
  $(window).scroll(function(){
      $(".header>.container").css("opacity", 1 - $(window).scrollTop() / ($('.header').height()/2));
  });
});