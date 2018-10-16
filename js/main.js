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

let currentEl = '';

// Calls hoverIntent plugin & inits Tooltips
$('[data-toggle="tooltip"]').hoverIntent(config);

// Display ClassicDB Tooltip for item
function displayTooltip(data) {
  const icon = `https://classicdb.ch/images/icons/medium/${data.icon}.jpg`;
  const image = `<img src="${icon}" alt="${data.name_enus}"></img>`;

  // Set Title to tooltip data
  $(currentEl).attr('title', data.tooltip_enus);
  // Display tooltip
  $(currentEl).tooltip('show');
  // Prepend Image on tooltip, removing previous image first if one exists
  $('.tooltip img:first-child').remove();
  $('.tooltip').prepend(image);
}

// JSONP Callback Function
const $WowheadPower = {
  registerItem: function(item, num, data) {
    displayTooltip(data);
  },
  registerSpell: function(item, num, data) {
    displayTooltip(data);
  }
};

// Mouse Enter function for hoverIntent()
function makeTall(e) {
  // Re-Assigns current element as target for callblack function
  currentEl = e.target;

  const link = this.href;
  const item = link.toString().slice(22);
  let item_url = `https://classicdb.ch/ajax.php?${item}&power?`;

  // Get Item from ClassicDB
  jQuery.ajax({
    url: item_url,
    dataType: 'jsonp',
    jsonpCallback: '$WowheadPower.registerItem'
  });
}

// Mouse Leave function for hoverIntent()
function makeShort(e) {
  const el = e.target;
  $(el).attr('title', '');
  $(el).tooltip('hide');
}
