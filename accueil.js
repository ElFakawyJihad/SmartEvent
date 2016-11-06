var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var config = require("config");

var databaseConfig = config.get("database");

var mysql = require("mysql");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
	res.send("Hello World !");
});

app.post('/connection', function (req, res) {
  console.log("Email : " + req.body.email)
	console.log("Password : " + req.body.password)

	var email = req.body.email;
	var password = req.body.password;

	var connection = mysql.createConnection(databaseConfig);
	connection.connect();
	connection.query("SELECT * FROM user where email = '" + email + "' AND password = '" + password + "'", function(err, rows, fields){
		if (rows.length) {
	    res.end(JSON.stringify(rows[0]));
		} else {
			return "NO RESULT FOUND";		
		}
	});
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Server running at http://%s:%s", host, port)
});

