var page = require('webpage').create();
var count = 2;

page.onResourceRequested = function(requestData, networkRequest) {
  console.log(requestData.url);
};

page.onResourceReceived = function(response) {
  console.log("Response received");
};

page.onLoadFinished = function(status) {
  count--;

  if(count === 0) {
    page.render('./02-white.png');
    phantom.exit(0);
  }
};

page.open('http://localhost:8080', function(status) {
  if(status === "success") {
    console.log('Page is loaded, continue');

    page.sendEvent('click', 50, 50);

    page.render('./01-black.png');

    page.reload();
  } else {
    console.log('Could not load page');
  }

  // phantom.exit(0);
});
