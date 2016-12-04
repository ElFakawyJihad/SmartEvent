module.exports = {
  create_data: function(client){

  	client.query("INSERT INTO coming VALUES('Invité')");
  	client.query("INSERT INTO coming VALUES('Viendra')");
  	client.query("INSERT INTO coming VALUES('Peut-être')");
  	client.query("INSERT INTO coming VALUES('Ne viendra pas')");

	client.query("INSERT INTO user VALUES('dureyantonin@gmail.com', 'Antonin', 'Durey', '', '1995-01-17', 'azerty01', '0', '0')");

	client.query("INSERT INTO user VALUES('test', 'test', 'test', '', '', 'test', '0', '0')");

},
  create_tables: function(client){

  	// rang table
	client.query("DROP TABLE IF EXISTS coming", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
  		}
	});

	client.query("CREATE TABLE coming (id INT PRIMARY KEY, name VARCHAR(20))", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

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
	client.query("CREATE TABLE lieu (id INT PRIMARY KEY, name VARCHAR(45), description VARCHAR(255), longitude DOUBLE PRECISION, latitude DOUBLE PRECISION)", function (err, client, done) {  
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
	client.query("CREATE TABLE event (id INT PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut TIMESTAMP, date_fin TIMESTAMP, nb_places INT, lieu_id INT, organisateur_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error fetching client from pool', err)
		}  	
	});

	// user table
	client.query("DROP TABLE IF EXISTS users", function (err, client, done) {  
  		if (err) {
    			return console.error('error dropping user table', err)
		}  	
	});
	// TODO rajouter le genre
	client.query("CREATE TABLE users (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), naissance DATE, password VARCHAR(20), grade_id INT, rang_id INT)", function (err, client, done) {  
  		if (err) {
    			return console.error('error creating user table', err)
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
	client.query("CREATE TABLE user_join_event (id INT PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock TIMESTAMP, coming_id INT)", function (err, client, done) {  
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
},
create_database: function(){

	client.query("CREATE DATABASE smartevents");


},
};