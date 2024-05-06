const express = require('express');
const app = express();
const PORT = 4000;

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'anti_heroes',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server ON FML ✨ ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Teste de server com o banco de Anti-Herois");
});

app.get('/anti_heroes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anti_heroes');

        if (result.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Nenhum heroi encontrado',
                total: result.rowCount,
            })
        }

        res.json({
            status: 'success',
            message: 'Lista de herois',
            total: result.rowCount,
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

app.get('/anti_heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM anti_heroes WHERE id = $1', [id]);

        if (result.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Heroi não encontrado',
                total: result.rowCount,
            })
        }

        res.json({
            status: 'success',
            message: 'Heroi encontrado',
            total: result.rowCount,
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

app.post('/anti_heroes', async (req, res) => {
    try {
        const { name, power, experience, lvl, health, attack } = req.body;

        const result = await pool.query('INSERT INTO anti_heroes (name, power, experience, lvl, health, attack) VALUES ($1, $2, $3, $4, $5, $6)', [name, power, experience, lvl, health, attack]);

        res.json({
            status: 'success',
            message: 'Anti-Heroi adicionado com sucesso',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

