var pg = require("pg");
var connectionString = "postgres://kzxtapoogcvmno:PsjtCpudOYotO0C90iG_3BG_ik@ec2-54-75-230-117.eu-west-1.compute.amazonaws.com:5432/dfi19v1ancp7qq";


var client = new pg.Client(connectionString);
client.connect();

create_tables();
create_data();

client.end();




function create_data(){

	client.query("INSERT INTO user VALUES('dureyantonin@gmail.com', 'Antonin', 'Durey', '', '1995-01-17', 'azerty01', '0', '0')");

}

function create_tables(){

	// rang table
	client.query("DROP TABLE IF EXISTS rang");
	client.query("CREATE TABLE rang (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))");

	// grade table
	client.query("DROP TABLE IF EXISTS grade");
	client.query("CREATE TABLE grade (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45))");

	// lieu table
	client.query("DROP TABLE IF EXISTS lieu");
	client.query("CREATE TABLE lieu (id INT PRIMARY KEY, name VARCHAR(45), description VARCHAR(255), longitude DOUBLE, latitude DOUBLE)");

	// event table
	client.query("DROP TABLE IF EXISTS event");
	client.query("CREATE TABLE event (id INT PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut DATETIME, date_fin DATETIME, nb_places INT, lieu_id INT, organisateur_id INT)");

	// user table
	client.query("DROP TABLE IF EXISTS user");
	client.query("CREATE TABLE user (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), naissance DATE, password VARCHAR(20), grade_id INT, rang_id INT)");

	// friend table
	client.query("DROP TABLE IF EXISTS friend");
	client.query("CREATE TABLE friend (id INT PRIMARY KEY, user1_email VARCHAR(45), user2_email VARCHAR(45))");

	// user_join_event table
	client.query("DROP TABLE IF EXISTS user_join_event");
	client.query("CREATE TABLE user_join_event (id INT PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock DATETIME, type ENUM('Peut-être', 'Invité', 'Viendra', 'Ne viendra pas'))");

	// interest
	client.query("DROP TABLE IF EXISTS interest");
	client.query("CREATE TABLE interest (id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_of INT)");

	// user_has_interest
	client.query("DROP TABLE IF EXISTS user_has_interest");
	client.query("CREATE TABLE user_has_interest (id INT PRIMARY KEY, user_email VARCHAR(40), interest_id INT)");

	// event_has_interest
	client.query("DROP TABLE IF EXISTS event_has_interest");
	client.query("CREATE TABLE event_has_interest (id INT PRIMARY KEY, event_id INT, interest_id INT)");
}


