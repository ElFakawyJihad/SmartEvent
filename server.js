var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var config = require("config");

var pg = require("pg");

var connectionString = 'postgres://kzxtapoogcvmno:PsjtCpudOYotO0C90iG_3BG_ik@ec2-54-75-230-117.eu-west-1.compute.amazonaws.com:5432/dfi19v1ancp7qq';


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
	res.send("Hello World !");
});

app.post('/connection', function (req, res) {

	var email = req.body.email;
	var password = req.body.password;

	res.end(connect(email, password));
});

var server = app.listen(8080, function () {
   	var host = server.address().address;
   	var port = server.address().port;

   console.log("Server running at http://%s:%s", host, port)
});


function connect(email, password) {
	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query("SELECT * FROM user where email = '" + email + "' AND password = '" + password + "'");

	query.on('row', function(row){
		results.push(row);	
	});

	query.on('end', function(){
		done();
		if(rows.length){
			return JSON.stringify({message : "OK", data : rows[0]});
		}
		return stringify({message: "KO"});
	});
};



