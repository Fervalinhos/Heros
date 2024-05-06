CREATE DATABASE anti_heroes;

\c anti_heroes;

CREATE TABLE anti_heroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    power VARCHAR(100) NOT NULL,
    experience INTEGER NOT NULL,
    lvl INTEGER NOT NULL,
    health INTEGER NOT NULL,
    attack INTEGER NOT NULL
);

DROP TABLE IF EXISTS anti_heroes;

CREATE TABLE battles (
    id SERIAL PRIMARY KEY,
    anti_hero1_id INTEGER NOT NULL,
    anti_hero2_id INTEGER NOT NULL,
    winner_id INTEGER,
    loser_id INTEGER,
    FOREIGN KEY (anti_hero1_id) REFERENCES anti_heroes(id),
    FOREIGN KEY (anti_hero2_id) REFERENCES anti_heroes(id)
);

DROP TABLE IF EXISTS battles;

// sql - INSERT

INSERT INTO anti_heroes (name, power, experience, lvl, health, attack) VALUES ('Joker', 'Crazy', 100, 1, 100, 10);
INSERT INTO anti_heroes (name, power, experience, lvl, health, attack) VALUES ('Deadpool', 'Imortalidade', 0, 1, 100, 25);


// Insomina - POST

http://localhost:3000/anti_heroes
{
    "name": "Joker",
    "power": "Crazy",
    "experience": 100,
    "lvl": 1,
    "health": 100,
    "attack": 10
}

{
	"name" : "Deadpool",
	"power" : "Imortalidade",
	"experience" : 0,
	"lvl" : 1,
	"health" : 100,
	"attack" : 25
}