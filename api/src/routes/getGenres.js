// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

const { Router } = require('express');
const router = Router();
const { Genre } = require('../db');
const axios = require('axios');
const { BASE_URL, GENRES_URL } = require('../../constants')
const { API_KEY } = process.env;

router.get('/', async function getAllGenres(req, res) {
    try {
        const genres = await axios.get(`${BASE_URL}${GENRES_URL}?key=${API_KEY}`)
        genres.data.results && genres.data.results.map(async (g) => {
            await Genre.findOrCreate({
                where: { name: g.name }
            });
        });
        const genresDB = await Genre.findAll();
        res.json(genresDB);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

module.exports = router;
