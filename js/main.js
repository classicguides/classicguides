// $(document).ready(function() {
//   console.log(jQuery('#gear ul li a').attr('data-toggle'));
//   console.log($('[data-toggle="tooltip"]').tooltip());
// });

// Scroll To Top Button
$('#toTop').on('click', function() {
  jQuery('.container').animate({ scrollTop: 0 }, 1000);
});

$('#gear a').on('mouseover', function() {
  const link = this.href;
  item_id = link.toString().slice(27);
  let item_url = `https://classicdb.ch/ajax.php?item=${item_id}&power`;

  jQuery.ajax({
    type: 'GET',
    url: item_url,
    success: function(res) {
      let start = res.indexOf('{');
      let end = res.indexOf('}') + 1;
      let data = res.slice(start, end);
      data = JSON.parse(escapeSpecialChars(data));
      console.log(data);
      let image_name = data.icon;
      let image_url = `https://classicdb.ch/images/icons/medium/${image_name}.jpg`;
    },
    error: function(err) {
      console.log(err);
    }
  });
});

function escapeSpecialChars(jsonString) {
  return jsonString
    .replace('name_enus', '"name_enus"')
    .replace('quality', '"quality"')
    .replace('icon', '"icon"')
    .replace('tooltip_enus', '"tooltip_enus"')
    .replace('model', '"model"')
    .replace(/\\"/g, '"')
    .replace(/\\\//g, '/')
    .replace(/'/g, '"')
    .replace(/="/g, "='")
    .replace(/">/g, "'>")
    .replace(/\\"/g, '')
    .replace(/" c/g, "' c");
}
