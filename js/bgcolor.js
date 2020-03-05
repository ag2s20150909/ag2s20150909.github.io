/* Green */
// var targetColor = '#C7EDCC'; // 93
var targetColor = '#50C1E6C6'; // 90


var Brightness_Threshold = 0.94; // a number between 0 and 1

// For websites updating their contents via ajax, NoBrighter can run in background and convert background color periodically.

var $minHeight = 6;

// ========== End of config ========== //

function isTransparent(color) {
    return color === 'transparent' || color.replace(/ /g, '') === 'rgba(0,0,0,0)';
}

function changeBgcolor(elem) {
  if (elem.nodeType !== Node.ELEMENT_NODE) {
    return;
  }
  var bgcolor = window.getComputedStyle(elem, null).backgroundColor;
  if (bgcolor && !isTransparent(bgcolor) && elem.clientHeight >= $minHeight) {
    var arRGB = bgcolor.match(/\d+/g);
    var r = parseInt(arRGB[0], 10);
    var g = parseInt(arRGB[1], 10);
    var b = parseInt(arRGB[2], 10);

    // we adopt HSL's lightness definition, see http://en.wikipedia.org/wiki/HSL_and_HSV
    var brightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 255 / 2;

    if (brightness > Brightness_Threshold) {
      elem.style.backgroundColor = targetColor;
    }
    return true;
  } else {
    return false;
  }
}

function changeTransparent(elem) {
  var bgcolor = window.getComputedStyle(elem, null).backgroundColor;
  if (!bgcolor || isTransparent(bgcolor)) {
    elem.style.backgroundColor = targetColor;
  }
}

var alltags = document.getElementsByTagName("*");

var bodyChanged = false;

function changeAll() {
  var len = alltags.length;
  for (var i = 0; i < len; i++) {
    var changed = changeBgcolor(alltags[i]);
    var tagName = alltags[i].tagName.toUpperCase();
    if (changed && (tagName === "BODY" || tagName === "HTML")) {
      bodyChanged = true;
    }
  }
}
changeAll();
if (window.top == window) {
  // change transparent only when in top frame
  if (!bodyChanged) {
    changeTransparent(document.body.parentNode);
  }
}
setInterval(changeAll, 2000); // convert every 2s