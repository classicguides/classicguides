$(function() {
  $('[data-toggle="tooltip"]').tooltip('hide');
});

// Scroll To Top Button
$('#toTop').on('click', function() {
  jQuery('.container').animate({ scrollTop: 0 }, 1000);
});

// Tooltips for gear
$('#gear a').hover(
  function(e) {
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

        // Capture Element
        const el = e.target;
        // Set Title attribute
        $(el).attr('title', data.tooltip_enus);
        // Display tooltip
        $(el).tooltip('show');
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  function(e) {
    const el = e.target;
    // $(el).attr('title', '');
    $(el).tooltip('hide');
  }
);

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
