//NodeJS

var http = require('http');
var fs = require('fs');
var portNo = 8081;
var GOOGLE_GEOCODE_API_KEY = "YOUR_API_KEY";


http.createServer(function(request, response) {
    response.writeHead(200);
        //response.write("<h1>Hello World</h1>");
    fs.readFile('index.html', function(err, contents){
    	response.writeHead(200);
		response.write(contents);
		response.end();
	});

}).listen(portNo);

console.log('Check Port ' + portNo + '....');





var address = "1600 Amphitheatre Parkway, Mountain View, CA"


var google_api_path = '/maps/api/geocode/json?address=' + address.split(' ').join('+') + '&key=' + GOOGLE_GEOCODE_API_KEY;

console.log(google_api_path);

var options = {
	host: 'maps.googleapis.com',
	port: 80,
	path: google_api_path
};

console.log(options.path);

var google_api_url = "https://" + options.host + google_api_path;


console.log(google_api_url);
http.get(options, function(resource) {
	//console.log(resource);
	var body = '';
	resource.on('data', function(packet){
		body += packet;
	});

	resource.on('end', function(){
		var googleMapsData = JSON.parse(body);
		console.log(googleMapsData);
	});
});








/*
fs.readFile(google_api_url, 
		function(err, contents){
			console.log(contents);
});
*/