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

	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query("SELECT * FROM userApp where email = '" + email + "' AND password = '" + password + "'");

	query.on('row', function(row){
		results.push(row);	
	});

	query.on('end', function(){
		if(results.length){
			res.write(JSON.stringify({message : "OK", data : results[0]}));
		} else {
			res.write(JSON.stringify({message: "KO"}));
		}	
		res.end();	
	});

	
});


app.post('/inscription', function (req, res) {

	var email = req.body.email;
	var password = req.body.password;

	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query("INSERT INTO user (email, password) VALUES ('" + email + "', '" + password + "')", function(err, result) {
        	if (err) {
                res.write(JSON.stringify({message: "KO"}));
            } else {
				res.write(JSON.stringify({message: "OK"}));
            }
		res.end();
	});
	
});

app.post('/fill_informations', function (req, res) {

	var email = req.body.email;
	var prenom = req.body.prenom;
	var nom = req.body.nom;
	var naissance = req.body.naissance;
	var genre = req.body.genre; 

	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query("UPDATE user SET prenom = '" + prenom + "', nom = '" + nom + "', naissance = '" + naissance + "', genre = '" + genre + "' WHERE email = '" + email + "'", function(err, result){
		if(err){
			res.write(JSON.stringify({message: "KO"}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}	
		res.end();	
	});

	
});

app.post('/create_event', function (req, res) {

	var titre = req.body.eventTitle;
	var category = req.body.eventCategory;
	var description = req.body.eventDescription;
	var date = req.body.eventDate;
	var capacity = req.body.eventCapacity; 
	var localisation = req.body.eventLocalisation;
	var latitude = req.body.localisationLat; 
	var longitude = req.body.localisationLong;

	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();

	var query = client.query("INSERT into lieu(name, longitude, latitude) VALUES('" + localisation + "', '" + longitude + "', '" + latitude + "')'", function(err, result){
		if(err){
			res.write(JSON.stringify({message: "OK", error:err}));
		} else {
			console.log("result : " + result);

		}	
		res.end();	
	});

/*
	var query = client.query("INSERT into event(titre, description, date_debut, nb_places, ) VALUES('" + prenom + "', nom = '" + nom + "', naissance = '" + naissance + "', genre = '" + genre + "' WHERE email = '" + email + "'", function(err, result){
		if(err){
			res.write(JSON.stringify({message: "OK"}));
		} else {
			res.write(JSON.stringify({message: "KO"}));
		}	
		res.end();	
	});

	*/

	
});


function create_data(){

	client.query("INSERT INTO user VALUES('dureyantonin@gmail.com', 'Antonin', 'Durey', '', '1995-01-17', 'azerty01', '0', '0')");

	client.query("INSERT INTO user VALUES('test', 'test', 'test', '', '', 'test', '0', '0')");

}

function create_tables(){

	// rang table
	client.query("DROP TABLE IF EXISTS rang", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
  		}
	});
	client.query("CREATE TABLE rang (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// grade table
	client.query("DROP TABLE IF EXISTS grade", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE grade (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// lieu table
	client.query("DROP TABLE IF EXISTS lieu", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE lieu (id INT PRIMARY KEY, name VARCHAR(45), description VARCHAR(255), longitude DOUBLE, latitude DOUBLE)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// event table
	client.query("DROP TABLE IF EXISTS event", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE event (id INT PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut DATETIME, date_fin DATETIME, nb_places INT, lieu_id INT, organisateur_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// user table
	client.query("DROP TABLE IF EXISTS user", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE user (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), naissance DATE, password VARCHAR(20), grade_id INT, rang_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// friend table
	client.query("DROP TABLE IF EXISTS friend", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE friend (id INT PRIMARY KEY, user1_email VARCHAR(45), user2_email VARCHAR(45))", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// user_join_event table
	client.query("DROP TABLE IF EXISTS user_join_event", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE user_join_event (id INT PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock DATETIME, type ENUM('Peut-être', 'Invité', 'Viendra', 'Ne viendra pas'))", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// interest
	client.query("DROP TABLE IF EXISTS interest", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE interest (id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_of INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// user_has_interest
	client.query("DROP TABLE IF EXISTS user_has_interest", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE user_has_interest (id INT PRIMARY KEY, user_email VARCHAR(40), interest_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// event_has_interest
	client.query("DROP TABLE IF EXISTS event_has_interest", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
	client.query("CREATE TABLE event_has_interest (id INT PRIMARY KEY, event_id INT, interest_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});
}



app.get('/reinit_server', function (req, res) {
	var client = new pg.Client(connectionString);
	client.connect();

	create_tables();
	create_data();
});






var server = app.listen(process.env.PORT);




