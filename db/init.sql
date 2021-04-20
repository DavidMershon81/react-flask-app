CREATE DATABASE IF NOT EXISTS daviddb;
USE daviddb;

CREATE TABLE IF NOT EXISTS cities (
  id int NOT NULL,
  name text,
  PRIMARY KEY (id)
);

INSERT INTO cities
    (id, name) 
VALUES
    (1, 'Los Angeles'),
	(2, 'Chicago'),
	(3, 'Tokyo'),
	(4, 'Buenos Aires'),
	(5, 'Singapore'),
	(6, 'San Francisco'),
	(7, 'Seoul'),
	(8, 'Nagasaki');