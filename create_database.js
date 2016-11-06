var config = require("config");
var mysql = require("mysql");
var connection = mysql.createConnection(config.get("no-database"));

connection.connect();
create_database();
connection.end();

function create_database(){
	connection.query("DROP DATABASE IF EXISTS smartevents");
	connection.query("CREATE DATABASE IF NOT EXISTS smartevents", function(err, rows, fields){ });
}


