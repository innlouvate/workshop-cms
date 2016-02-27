
var fs = require('fs');
var querystring = require('querystring');

var message1 = 'This is the node url';
var message2 = 'This is the girls url';

function handler(request, response){
  var endpoint = request.url;

  var publicFolder = __dirname + '/..' + '/public';


  if(endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(publicFolder + '/index.html', function(error, file) {
      if(error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if(endpoint === '/create-post') {

    response.writeHead(302, {"Location": "/"})

    var allTheData = '';
    request.on('data', function(chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
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

    fs.readFile(publicFolder + endpoint, function(error, file){
      if(error) {
        console.log(error);
        return;
      }
    response.end(file);
    });
  }

}

module.exports = handler;
