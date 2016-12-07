var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var config = require("config");


var pg = require("pg");
var pgp = require('pg-promise')();

var connectionString;
if(process.env.PORT != undefined){
	connectionString = 'postgres://kzxtapoogcvmno:PsjtCpudOYotO0C90iG_3BG_ik@ec2-54-75-230-117.eu-west-1.compute.amazonaws.com:5432/dfi19v1ancp7qq';
} else {
 	connectionString = 'postgres://postgres:06072012@localhost:5432/smartevents';
}

var helper_function = require("./helper_function")

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
	var query = client.query("SELECT * FROM users where email = '" + email + "' AND password = '" + password + "'");

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
	var query = client.query("INSERT INTO users (email, password) VALUES ('" + email + "', '" + password + "')", function(err, result) {
        	if (err) {
                res.write(JSON.stringify({message: "KO", error:err}));
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


app.get('/get_event', function (req, res) {

});

app.post('/join_event', function (req, res) {
	var email = req.body.email;
	var event_id = req.body.event_id;
	var client = new pg.Client(connectionString);
	client.connect();

	var query = client.query("INSERT into user_join_event(user_email, event_id) VALUES('" + email + "', '" + event_id + ")", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
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

	
	var query = client.query("INSERT into event(titre, description, date_debut, nb_places, lieu_name, longitude, latitude, lieu_id) VALUES('" + titre + "', '" + description + "', '" + date + "', " + capacity + ", " + localisation + ", " + longitude + ", " + latitude + ")", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}
		res.end();
	});
        		

});

app.get('/test', function(req, res){



	var email = req.body.email;
	var password = req.body.password;

	var results = [];

	var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query("INSERT into lieu(name, longitude, latitude) VALUES('Au M5, '50.2', '0.3280')", function(err1, result1){
    	if (err1) {
            res.write(JSON.stringify({message: "KO", error:err1}));
            res.end();

        } else {

        	var querybis = client.query("SELECT id FROM lieu WHERE name = 'Au M5' AND longitude  = 50.2 AND latitude = 0.3280", function(err2, result2){
        		if(err2){
        			res.write(JSON.stringify({message: "KO", error:err2}));
        			res.end();

        		} else {
        			var queryter = client.query("INSERT into event(titre, description, date_debut, nb_places, lieu_id) VALUES('This is a nice event', 'This is the description', '2016-12-07', '5', " + result2 + ")", function(err3, result3){
        				// , titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut TIMESTAMP, date_fin TIMESTAMP, nb_places INT, lieu_id INT, organisateur_id INT

        				if(err3){
        					res.write(JSON.stringify({message: "KO", error:err3}));
        				} else {
        					res.write(JSON.stringify({message: "OK"}));

        				}
        				res.end();

        			});

        		}
        	});
        }
	});

});





app.get('/reinit_data', function (req, res) {
	
	helper_function.create_tables(connectionString);
	helper_function.create_data(connectionString);

	res.write("OK");
	res.end();

});






var server = app.listen(process.env.PORT || 8080);




