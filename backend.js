//NodeJS

var http = require('http');
var https = require('https');
var fs = require('fs');
var portNo = 8080;
var GOOGLE_GEOCODE_API_KEY = "YOUR_API_KEY";

function getGeoCode(address){
	fs.readFile('geocodeAPIKey.log', function(err, contents) {
		GOOGLE_GEOCODE_API_KEY = contents;
		//console.log(contents);

		if (err) throw err;



		//var address = "1600 Amphitheatre Parkway, Mountain View, CA"


		var google_api_path = '/maps/api/geocode/json?address=' + address.split(' ').join('+') + '&key=' + GOOGLE_GEOCODE_API_KEY;

		//console.log(google_api_path);

		var options = {
			host: 'maps.googleapis.com',
			port: 443,
			path: google_api_path
		};

		//console.log(options.path);

		var google_api_url = "https://" + options.host + google_api_path;


		console.log(google_api_url);
		https.get(options, function(resource) {
			//console.log(resource);
			var body = '';
			resource.on('data', function(packet){
				body += packet;
			});

			resource.on('end', function(){
				var googleMapsData = JSON.parse(body);
				//console.log(googleMapsData);
				return googleMapsData;
			});
		}).on('error', function(e){
			//console.log("Error in loading Geocode: ", e)
		});

	});
}

console.log("Mason:" + getGeoCode("1600 Amphitheatre Parkway, Mountain View, CA"));

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







var mysql = require("mysql");
var conn = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"UAV_HACKS",
	database:"yychacksdb"
});

conn.connect(function(err){
	if(err){
		console.log('Error connecting to DB');
		return;
	}
	console.log('Connected')
})

conn.query('SELECT * FROM USERS', function(err, rows, fields) {
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error in query');
});

conn.end(function(err){});


/*
fs.readFile(google_api_url, 
		function(err, contents){
			console.log(contents);
});
*/