DROP DATABASE IF EXISTS dealsdb;
CREATE DATABASE dealsdb;

use dealsdb;
CREATE TABLE post(
	id INT(255) NOT NULL AUTO_INCREMENT,
    author VARCHAR(20) NOT NULL,
    item VARCHAR(20) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
	restaurant VARCHAR(20) NOT NULL,
    restAdd VARCHAR(30),
    restLocation VARCHAR(30),
    PRIMARY KEY(id)
);
