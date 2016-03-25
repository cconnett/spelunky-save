chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html',
                           {'outerBounds': {'width': 550, 'height': 1000}});
});
