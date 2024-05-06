const express = require('express');
const app = express();
const PORT = 4000;

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'heros',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server ON FML ✨ ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Teste de server com o banco de Herois");
});




