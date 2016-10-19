var config = require('config');

var databaseConfig = config.get('database');

var mysql = require('mysql');
var connection = mysql.createConnection(databaseConfig);

connection.connect();

create_tables();
create_data();

connection.end();



function create_data(){

	// To be filled later
}

function create_tables(){

	// rang table
	connection.query('CREATE TABLE rang (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45)', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table rang.');
	});

	// grade table
	connection.query('CREATE TABLE grade (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45)', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table grade.');
	});

	// lieu table
	connection.query('CREATE TABLE lieu (id INT PRIMARY KEY, name VARCHAR(45), description VARCHAR(255), long DOUBLE, lat DOUBLE', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table lieu.');
	});

	// event table
	connection.query('CREATE TABLE event (id INT PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut DATETIME, date_fin DATETIME, nb_places INT, lieu_id INT, organisateur_id INT, type ENUM('')', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table event.');
	});

	// user table
	connection.query('CREATE TABLE user (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), age INT, password VARCHAR(20), grade_id INT, rang_id INT', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table user.');
	});

	// friend table
	connection.query('CREATE TABLE friend (id INT PRIMARY KEY, user1_email VARCHAR(45), user2_email(45)', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table rang.');
	});

	// user_join_event table
	connection.query('CREATE TABLE user_join_event (id INT PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock DATETIME, type ENUM('Peut-être', 'Invité', 'Viendra', 'Ne viendra pas')', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table user_join_event.');
	});

	// interest
	connection.query('CREATE TABLE interest (id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_of INT', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table interest.');
	});

	// user_has_interest
	connection.query('CREATE TABLE user_has_interest (id INT PRIMARY KEY, user_email VARCHAR(40), interest_id INT', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table user_has_interest.');
	});

	// event_has_interest
	connection.query('CREATE TABLE event_has_interest (id INT PRIMARY KEY, event_id INT, interest_id INT', function(err, rows, fields) {
	  if (!err)
	    console.log('Table created');
	  else
	    console.log('Error while creating table event_has_interest.');
	});
}


