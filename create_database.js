var pg = require("pg");
var connectionString = "postgres://YourUserName:YourPassword@localhost:5432";


var client = new pg.Client(connectionString);
client.connect();

create_database();
client.end();

function create_database(){
	client.query("DROP DATABASE IF EXISTS smartevents");
	client.query("CREATE DATABASE IF NOT EXISTS smartevents");
}


