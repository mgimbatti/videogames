
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { BASE_URL, GAMES_URL } = require('../../constants')
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();


router.get('/', async function getFifteenVideogames(req, res) {
    try {
        const videogamesApi = await axios.get(`${BASE_URL}${GAMES_URL}?key=${API_KEY}`);
        const gamesApi = videogamesApi.data.results.map((g) => {
            const content = {
                name: g.name,
                image: g.background_image,
                genres: g.genres.map((g) => g.name),
                origin: 'EXISTING',
                id: g.id
            }
            return content;
        });
        const gamesDB = await Videogame.findAll({ limit: 15, include: Genre })

        let gamesDBJSON = gamesDB.map((g) => g.toJSON())
        let gamesDBMapFormat = gamesDBJSON.map((g) => ({ name: g.name, genres: g.genres.map((g) => g.name) }))

        let response = gamesDBMapFormat.concat(gamesApi)

        res.json(response.slice(0, 15))
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;