// phantomjs/server.js
var server = require('webserver').create();
var fs = require('fs');

server.listen('127.0.0.1:8081', function(request, response) {
  console.log('[' + request.url + ']');

  if(request.url === '/hello.json') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(fs.read('./phantomjs/hello.json'));
    response.close();
  } else {
    response.statusCode = 404;
    response.write('');
    response.close();
  }
});
