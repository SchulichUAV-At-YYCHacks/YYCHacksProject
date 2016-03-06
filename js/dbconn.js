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

var usersel = { UserNameIN : "Calder Kitagawa"}
conn.query('CALL User_Select(?)', usersel, function(err, rows, fields) {
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error in query');
});

conn.end(function(err){});