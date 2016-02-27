var http = require('http');
var fs = require('fs');
var server = http.createServer(handler);

var message1 = 'This is the node url';
var message2 = 'This is the girls url';

function handler(request, response){
  var endpoint = request.url;
  if(endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if(error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === '/node') {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(message1);
      response.end(file);
  } else if (endpoint === '/girls') {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(message2);
      response.end(file);
  } else {
      var contentType = request.headers.accept.split(',')[0];

      response.writeHead(200, {"Content-Type": contentType});

      fs.readFile(__dirname + '/public' + endpoint, function(error, file){
        if(error) {
          console.log(error);
          return;
        }
        response.end(file);
      });
  }
}

// var server = http.createServer(handler);

server.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
