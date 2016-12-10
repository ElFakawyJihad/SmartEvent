var pgp = require('pg-promise')();

module.exports = {
  	create_data: function(connectionString, res){

	 	var db = pgp(connectionString);

		db.tx(function () {
        	return this.batch([
            	this.none('DROP TABLE IF EXISTS coming'),
            	this.none('CREATE TABLE coming (id SERIAL PRIMARY KEY, name VARCHAR(20))'),

            	this.none('DROP TABLE IF EXISTS rang'),
            	this.none('CREATE TABLE rang (id SERIAL PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))'),

            	this.none('DROP TABLE IF EXISTS grade'),
            	this.none('CREATE TABLE grade (id SERIAL PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))'),

            	this.none('DROP TABLE IF EXISTS event'),
            	this.none('CREATE TABLE event (id SERIAL PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut TIMESTAMP, date_fin TIMESTAMP, nb_places INT, lieu_name VARCHAR(45), description VARCHAR(255), longitude DOUBLE PRECISION, latitude DOUBLE PRECISION, organisateur_id INT)'),

            	this.none('DROP TABLE IF EXISTS users'),
            	this.none('CREATE TABLE users (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), naissance DATE, password VARCHAR(20), grade_id INT, rang_id INT)'),

            	this.none('DROP TABLE IF EXISTS friend'),
            	this.none('CREATE TABLE friend (id SERIAL PRIMARY KEY, user1_email VARCHAR(45), user2_email VARCHAR(45))'),

            	this.none('DROP TABLE IF EXISTS user_join_event'),
            	this.none('CREATE TABLE user_join_event (id SERIAL PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock TIMESTAMP, coming_id INT)'),

            	this.none('DROP TABLE IF EXISTS interest'),
            	this.none('CREATE TABLE interest (id SERIAL PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_of INT)'),

            	this.none('DROP TABLE IF EXISTS user_has_interest'),
            	this.none('CREATE TABLE user_has_interest (id SERIAL PRIMARY KEY, user_email VARCHAR(40), interest_id INT)'),

            	this.none('DROP TABLE IF EXISTS event_has_interest'),
            	this.none('CREATE TABLE event_has_interest (id SERIAL PRIMARY KEY, event_id INT, interest_id INT)'),

				this.none("INSERT INTO coming VALUES(1, 'Invité'), (2,'Viendra'), (3, 'Peut-être'), (4, 'Ne viendra pas')"),

            	this.none("INSERT INTO users VALUES('dureyantonin@gmail.com', 'Antonin', 'Durey', '', '1995-01-17', 'azerty01', '0', '0'), ('test', 'test', 'test', '', '1970-01-01', 'test', '0', '0')"),

        	]);
    	})
    	.then(function () {
    		console.log("Creating table OK");
        	res.write(JSON.stringify({message:"OK"}));
		res.end();	    	
	})
    	.catch(function (error) {
    		console.log("Creating table error");
        	res.write(JSON.stringify({message:"KO",err:error})); // print error;
    		return 1;
    	});
	},
};
