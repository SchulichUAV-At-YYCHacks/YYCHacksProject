//NodeJS

var http = require('http');
var fs = require('fs');



http.createServer(function(request, response) {
        response.writeHead(200);
        response.write("<h1>Hello World</h1>");
        response.end();
        }).listen(8080);

console.log('Check Port 8080....');

fs.readFile('index.html', function(err, contents){
	console.log(contents);
})