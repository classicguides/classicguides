// Init Scrollbar
jQuery(document).ready(function() {
  jQuery('.container').scrollbar();
});

// Scroll To Top Button
$('#toTop').on('click', function() {
  jQuery('.container').animate({ scrollTop: 0 }, 1000);
});

// hoverIntent config options
var config = {
  sensitivity: 10, // number = sensitivity threshold (must be 1 or higher)
  interval: 200, // number = milliseconds for onMouseOver polling interval
  over: makeTall, // function = onMouseOver callback (REQUIRED)
  timeout: 500, // number = milliseconds delay before onMouseOut
  out: makeShort // function = onMouseOut callback (REQUIRED)
};

// Calls hoverIntent plugin
$('[data-toggle="tooltip"]').hoverIntent(config);

// Mouse Enter function for hoverIntent()
function makeTall(e) {
  const link = this.href;
  const item = link.toString().slice(22);
  console.log(item);
  item_id = link.toString().slice(27);
  let item_url = `https://classicdb.ch/ajax.php?${item}&power`;

  // Get Item from ClassicDB
  jQuery.ajax({
    type: 'GET',
    url: item_url,
    success: function(res) {
      let start = res.indexOf('{');
      let end = res.indexOf('}') + 1;
      let data = res.slice(start, end);
      data = JSON.parse(escapeSpecialChars(data));

      // let image_name = data.icon;
      // let image_url = `https://classicdb.ch/images/icons/medium/${image_name}.jpg`;

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
}

// Mouse Leave function for hoverIntent()
function makeShort(e) {
  const el = e.target;
  $(el).attr('title', '');
  $(el).tooltip('hide');
}

// Formats the response body from ajax request for items
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
