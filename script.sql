CREATE TYPE join_type AS ENUM('Peut-être', 'Invité', 'Viendra', 'Ne viendra pas');


DROP TABLE IF EXISTS rang;
CREATE TABLE rang (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45));

DROP TABLE IF EXISTS grade;
CREATE TABLE grade (id INT PRIMARY KEY, name VARCHAR(12), description VARCHAR(45));



DROP TABLE IF EXISTS lieu;
CREATE TABLE lieu (id INT PRIMARY KEY, name VARCHAR(45), description VARCHAR(255), longitude FLOAT4, latitude FLOAT4);

DROP TABLE IF EXISTS event;
CREATE TABLE event (id INT PRIMARY KEY, titre VARCHAR(45), description VARCHAR(255), photo VARCHAR(45), date_debut TIMESTAMP, date_fin TIMESTAMP, nb_places INT, lieu_id INT, organisateur_id INT);

DROP TABLE IF EXISTS userApp;
CREATE TABLE userApp (email VARCHAR(40) PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), photo VARCHAR(45), naissance DATE, password VARCHAR(20), grade_id INT, rang_id INT);

DROP TABLE IF EXISTS friend;
CREATE TABLE friend (id INT PRIMARY KEY, user1_email VARCHAR(45), user2_email VARCHAR(45));


DROP TABLE IF EXISTS user_join_event;
CREATE TABLE user_join_event (id INT PRIMARY KEY, user_email VARCHAR(45), event_id INT, time_clock TIMESTAMP, type join_type);

DROP TABLE IF EXISTS interest;
CREATE TABLE interest (id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_of INT);

DROP TABLE IF EXISTS user_has_interest;
CREATE TABLE user_has_interest (id INT PRIMARY KEY, user_email VARCHAR(40), interest_id INT);

DROP TABLE IF EXISTS event_has_interest;
CREATE TABLE event_has_interest (id INT PRIMARY KEY, event_id INT, interest_id INT);

INSERT INTO userApp VALUES('dureyantonin@gmail.com', 'Antonin', 'Durey', '', '1995-01-17', 'azerty01', '0', '0');
