//NodeJS

var http = require('http');
var https = require('https');
var fs = require('fs');
require(./js/bootstrap.min.js)


var portNo = 8081;
var GOOGLE_GEOCODE_API_KEY = "YOUR_API_KEY";

http.createServer(function(request, response) {
    response.writeHead(200);
        //response.write("<h1>Hello World</h1>");

    fs.readFile('page.html', function(err, contents){
    	response.writeHead(200);
		response.write(contents);
		response.end();
	});

    if (request.method == 'POST') {
    	console.log("POST");
    	var body = '';
    	request.on('data', function (packet) {
    		body += packet;
    	});
    	request.on('end', function() {
    		console.log("POST received: " + body);
    	});
    }
    else
    {
    	console.log("GET received");

    }


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



