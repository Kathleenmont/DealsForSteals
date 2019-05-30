DROP DATABASE IF EXISTS dealsdb;
CREATE DATABASE dealsdb;

use dealsdb;
CREATE TABLE Post(
	id INT(255) NOT NULL AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    item VARCHAR(20) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
	restaurant VARCHAR(150) NOT NULL,
    comments VARCHAR(150) NULL,
    restLat VARCHAR(30),
    restLong VARCHAR(30),
    img VARCHAR(300),
    PRIMARY KEY(id)
);



