//NodeJS

var http = require('http');
var https = require('https');
var fs = require('fs');

var mysql = require("mysql");
var conn = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"UAV_HACKS",
	database:"yychacksdb"
});

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var portNo = 8081;
var GOOGLE_GEOCODE_API_KEY = "YOUR_API_KEY";

app.use('/', express.static(__dirname+'/'));


app.get('/',function(req,res){
  res.sendfile("index.html");
});


app.post('/event_submit',function(req,res){
  var event_name=req.body.event_name;
  var event_date=req.body.event_date;
  var location=req.body.location;
  var organizer=req.body.organizer;

  console.log(req.body);
  res.end("yes");
});


app.post('/organization_query',function(req,res){
  var organization_name=req.body.organization_name;

  console.log(req.body);
  res.end("yes");
});

app.post('/authin',function(req,res){
	console.log(req.body.UserContactIN)
  conn.query('CALL User_Select(?)', req.body.UserContactIN.toString(), function(err, rows, fields) {
	if (!err)
	{
		console.log('The solution is: ', rows);
		if (rows[0].length == 0){
			console.log("second")
			conn.query("CALL User_Insert('" + req.body.UserNameIN.toString() + "','" + req.body.UserContactIN.toString() + "','" + req.body.TokenID.toString()+"')" ,function(err, rows, fields){
				if (!err) {
					console.log("User added");
				}
				else {
					console.log(err)
					console.log("Failed")
				}
			});
		}
	} else {
		console.log(err)
	  console.log('Error in query');
	}
  });
  console.log(req.body);
  res.end("yes");
});

var mappins;

conn.query('CALL Location_SelectAll(1)', function(err, rows, fields){
	mappins = rows
});
app.listen(portNo, function() { 
	console.log('Check Port ' + portNo + '....');
});

/*
app.post('/', rawParser, function(request, response){
  console.log(request.body.eventt.name);      // your JSON
});
*/
/*
app.post('/', function (req, res) {
	res.send('POST');
	console.log('POST');
});
*/


/*
http.createServer(function(request, response) {
    response.writeHead(200);
        //response.write("<h1>Hello World</h1>");
    fs.readFile('auth.html', function(err, contents){
    	response.writeHead(200);
		response.write(contents);
		response.end();
	});

}).listen(portNo);
*/




function getGeoCode(address){
	fs.readFile('geocodeAPIKey.log', function(err, contents) {
		GOOGLE_GEOCODE_API_KEY = contents;
		console.log(contents);


		if (err) throw err;



		//var address = "1600 Amphitheatre Parkway, Mountain View, CA"


		var google_api_path = '/maps/api/geocode/json?address=' + address.split(' ').join('+') + '&key=' + GOOGLE_GEOCODE_API_KEY;

		console.log(google_api_path);


		var options = {
			host: 'maps.googleapis.com',
			port: 443,
			path: google_api_path
		};


		console.log(options.path);


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

				console.log(googleMapsData);
				return googleMapsData;
			});
		}).on('error', function(e){
			console.log("Error in loading Geocode: ", e)
		});

	});
}

console.log("Mason:" + getGeoCode("1600 Amphitheatre Parkway, Mountain View, CA"));



console.log('Check Port ' + portNo + '....');










conn.connect(function(err){
	if(err){
		console.log('Error connecting to DB');
		return;
	}
	console.log('Connected')
})


//conn.query('CALL User_Select(?)', "calderk2010@gmail.com", function(err, rows, fields) {
//	if (!err)
//		console.log('The solution is: ', rows);/
	//else
	//	console.log('Error in query');
//});

//conn.end(function(err){});


/*
fs.readFile(google_api_url, 
		function(err, contents){
			console.log(contents);
});
*/



