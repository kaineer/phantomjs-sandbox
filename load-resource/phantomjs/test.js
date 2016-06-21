// phantomjs/test.js
var page = require('webpage').create();
var server = require('webserver').create();
var fs = require('fs');

/// SERVER
server.listen('127.0.0.1:8081', function(request, response) {
  console.log('SERVER: ' + request.url);

  if(request.url === '/hello.js') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript');
    response.write(fs.read('./phantomjs/hello.js'));
    response.close();

    // server.close();
  } else {
    response.statusCode = 404;
    response.write('');
    response.close();
  }
});

/// WEBPAGE
page.onConsoleMessage = function(message) {
  console.log('PhantomJS: ' + message);
};

page.onResourceRequested = function(requestData, networkRequest) {
  console.log(requestData.url);

  if(requestData.url === 'http://woo.hoo/hello.js') {
    networkRequest.changeUrl('http://127.0.0.1:8081/hello.js');
  }
};

page.onLoadFinished = function(status) {
  if(status === 'success') {
    console.log(page.content);
    console.log('---------------------------------------');

    phantom.exit(0);
  } else {
    phantom.exit(1);
  }
};

page.open('http://127.0.0.1:8080');
