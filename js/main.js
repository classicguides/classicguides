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

$('#gear a').on('mouseover', function() {
  const link = this.href;
  item_id = link.toString().slice(27);
  let url = `https://classicdb.ch/ajax.php?item=${item_id}&power`;

  jQuery.ajax({
    type: 'GET',
    url: url,
    success: function(res) {
      console.log(res);
    },
    error: function(err) {
      console.log(err);
    }
  });
});
