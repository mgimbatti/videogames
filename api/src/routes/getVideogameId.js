// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego (name, description, release, rating)
// Incluir los géneros asociados

const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { BASE_URL, GAMES_URL } = require('../../constants')
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();

router.get('/:id', async function getVideogameById(req, res) {
    const id = req.params.id;
    const uuidValidator = id.includes('-');
    if (uuidValidator) {
        try {
            const gameDB = await Videogame.findByPk(id, { include: [Genre] })
            let gameDBJSON = gameDB.toJSON()
            gameDBJSON.genres = gameDBJSON.genres.map((g) => g.name)
            res.json(gameDBJSON)
        } catch (error) {
            console.error('Videogame does not exist')
            res.sendStatus(404)
        }
    } else {
        try {
            const gameAPI = await axios.get(`${BASE_URL}${GAMES_URL}/${id}?key=${API_KEY}`)
            let data = gameAPI.data;
            const content = {
                name: data.name,
                image: data.background_image,
                genres: data.genres.map((g) => g.name),
                description: data.description_raw,
                released: data.released,
                rating: data.rating,
                platforms: data.platforms.map((p) => p.platform.name),
                id: data.id
            }
            res.json(content)
        } catch (error) {
            console.error('Videogame does not exist')
            res.sendStatus(404)
        }
    }
});

module.exports = router;