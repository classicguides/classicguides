// $(window).on('load', function() {
//   $('.container').mCustomScrollbar({
//     theme: 'light-thick',
//     mouseWheel: { enable: true },
//     scrollInertia: 450,
//     mouseWheel: { normalizeDelta: true },
//     scrollbarPosition: 'outside'
//   });
// });

// Scroll To Top Button
$('#toTop').on('click', function() {
  $('.container').animate({ scrollTop: 0 }, 1000);
});
