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


app.get('/get_events', function (req, res) {
	var client = new pg.Client(connectionString);
	client.connect();

	
	var query = client.query("SELECT * FROM event", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK", result:result.rows}));
		}
		res.end();
	});

});

app.get('/get_event', function (req, res) {

	var id = req.body.id;

	var results = [];
	var client = new pg.Client(connectionString);
	client.connect();

	
	var query = client.query("SELECT * FROM event where id = " + id, function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK", result:result.rows}));
		}
		res.end();
	});

});

app.post('/join_event', function (req, res) {
	var email = req.body.email;
	var event_id = req.body.event_id;
	var client = new pg.Client(connectionString);
	client.connect();

	var query = client.query("INSERT into user_join_event(user_email, event_id, coming_id) VALUES('" + email + "', '" + event_id + "', 2)", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}
		res.end();
	});

});

app.get('/get_users_going_to_event', function (req, res) {
	var event_id = req.param('event_id');
	var client = new pg.Client(connectionString);
	client.connect();

	var query = client.query("SELECT * from users WHERE email IN (SELECT user_email FROM user_join_event WHERE event_id = " + event_id + " and coming_id = 2)", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK", result:result.rows}));
		}
		res.end();
	});

});

app.get('/get_event_near', function(req, res){
	var longitude = req.param('longitude');
	var latitude = req.param('latitude');
	var client = new pg.Client(connectionString);
	client.connect();

	var query = client.query("SELECT * from event WHERE fnCalcDistanceKM(" + latitude + ", latitude, " + longitude + ", longitude) < 10", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK", result:result.rows}));
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

	
	var query = client.query("INSERT into event(titre, description, date_debut, nb_places, lieu_name, longitude, latitude) VALUES('" + titre + "', '" + description + "', '" + date + "', '" + capacity + "', '" + localisation + "', '" + longitude + "', '" + latitude + "')", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}
		res.end();
	});
        		

});

app.post('/event_add_chat_message', function (req, res) {

	var eventId = req.body.eventId;
	var text = req.body.text;
	var user_email = req.body.user_email;
	var date = req.body.date;
	

	var client = new pg.Client(connectionString);
	client.connect();

	
	var query = client.query("INSERT into message_into_event(event_id, text, user_email, date) VALUES('" + eventId + "', '" + text + "', '" + user_email + "', '" + date + "')", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}
		res.end();
	});
        		

});

app.post('/get_messages_event', function (req, res) {

	var eventId = req.body.eventId;	

	var client = new pg.Client(connectionString);
	client.connect();

	
	var query = client.query("SELECT * FROM message_into_event WHERE eventId = '" + eventId + "' ORDERBY date", function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK", result: result.rows}));
		}
		res.end();
	});
        		

});

app.get('/form', function(req, res){

	res.write("<form action='/test_form' method='POST'><textarea name='request'></textarea><input type='submit' name='Valider'/></form>")
	res.end();
	

});


app.post('/test', function(req, res){



	var query_text = req.body.query_text;

	var results = [];


	var client = new pg.Client(connectionString);
	client.connect();

	
	var query = client.query(query_text, function(err, result){

		if(err){
			res.write(JSON.stringify({message: "KO", error:err}));
		} else {
			res.write(JSON.stringify({message: "OK"}));
		}
		res.end();
	});

});





app.get('/reinit_data', function (req, res) {
	
	helper_function.create_data(connectionString, res);

});






var server = app.listen(process.env.PORT || 8080);




