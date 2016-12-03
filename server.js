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
			res.write(JSON.stringify({message: "OK"}));
		} else {
			res.write(JSON.stringify({message: "KO"}));
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
			res.write(JSON.stringify({message: "OK"}));
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

var server = app.listen(process.env.PORT);




