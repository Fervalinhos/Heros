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

CREATE TABLE battles (
    id SERIAL PRIMARY KEY,
    hero1_id INTEGER NOT NULL,
    hero2_id INTEGER NOT NULL,
    result VARCHAR(100) NOT NULL,
    winner_id INTEGER NOT NULL,
    loser_id INTEGER NOT NULL,
    FOREIGN KEY (hero1_id) REFERENCES heroes(id),
    FOREIGN KEY (hero2_id) REFERENCES heroes(id)
);