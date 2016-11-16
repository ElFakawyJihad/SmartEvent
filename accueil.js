var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var config = require("config");

var databaseConfig = config.get("database");

var mysql = require("mysql");

var connection = require("connection");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
	res.send("Hello World !");
});

app.post('/connection', function (req, res) {

	res.end(perform(email, password));
});

var server = app.listen(8080, function () {
   	var host = server.address().address;
   	var port = server.address().port;

   console.log("Server running at http://%s:%s", host, port)
});

function performConnection(email, password){
	connection.connect(email, password);

	


}

