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


// Rota de anti herois,

app.get('/', (req, res) => {
    res.send("Teste de server com o banco de Anti-Herois");
});

app.get('/anti_heroes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anti_heroes');

        if (result.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Nenhum anti-heroi encontrado',
                total: result.rowCount,
            })
        }

        res.json({
            status: 'success',
            message: 'Lista de anti-herois',
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
            message: 'Anti-Heroi encontrado',
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

app.get('/anti_heroes/name/:name', async (req, res) => {
    try {
        const { name } = req.params;

        const result = await pool.query('SELECT * FROM anti_heroes WHERE LOWER(name) LIKE $1', [`%${name.toLocaleLowerCase()}%`]);

        if (result.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Anti-Heroi não encontrado',
                total: result.rowCount,
            })
        }

        res.json({
            status: 'success',
            message: 'Anti-Heroi encontrado',
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

app.put('/anti_heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, power, experience, lvl, health, attack } = req.body;

        const result = await pool.query('UPDATE anti_heroes SET name = $1, power = $2, experience = $3, lvl = $4, health = $5, attack = $6 WHERE id = $7', [name, power, experience, lvl, health, attack, id]);

        res.json({
            status: 'success',
            message: 'Anti-Heroi atualizado com sucesso',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

app.delete('/anti_heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM anti_heroes WHERE id = $1', [id]);

        res.json({
            status: 'success',
            message: 'Anti-Heroi deletado com sucesso',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

//Rota de batalhas

app.get('/battles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM battles');

        if (result.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Nenhuma batalha encontrada',
                total: result.rowCount,
            })
        }

        res.json({
            status: 'success',
            message: 'Lista todas de batalhas',
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

const calculateWinner = (anti_hero1, anti_hero2) => {
    const anti_hero1_power = anti_hero1.health * anti_hero1.attack;
    const anti_hero2_power = anti_hero2.health * anti_hero2.attack;

    if (anti_hero1_power > anti_hero2_power) {
        return anti_hero1;
    } else {
        return anti_hero2;
    }
}


app.post('/battles', async (req, res) => {
    try {
        const { anti_hero1_id, anti_hero2_id } = req.body;

        const anti_hero1 = await pool.query('SELECT * FROM anti_heroes WHERE id = $1', [anti_hero1_id]);
        const anti_hero2 = await pool.query('SELECT * FROM anti_heroes WHERE id = $1', [anti_hero2_id]);

        if (anti_hero1.rowCount == 0 || anti_hero2.rowCount == 0) {
            res.status(500).json({
                status: 'null',
                message: 'Anti-Heroi não encontrado',
            })
        }

        const winner = calculateWinner(anti_hero1.rows[0], anti_hero2.rows[0]);

        const result = await pool.query('INSERT INTO battles (anti_hero1_id, anti_hero2_id, winner_id, loser_id) VALUES ($1, $2, $3, $4)', [anti_hero1_id, anti_hero2_id, winner.id, winner.id == anti_hero1_id ? anti_hero2_id : anti_hero1_id]);

        res.json({
            status: 'success',
            message: 'Batalha adicionada com sucesso',
            data: {
                winner: winner,
                loser: winner.id == anti_hero1_id ? anti_hero2.rows[0] : anti_hero1.rows[0],
            },

        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
