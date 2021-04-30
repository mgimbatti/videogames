// POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

const { Videogame, Genre } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');
const router = Router();

router.post('/', async function addVideogame(req, res) {
    const id = uuidv4();
    const { name, description, released, rating, platforms, genres } = req.body;
    try {
        let addedGame = await Videogame.create({ id, name, description, released, rating, platforms })

        genres.map(async (g) => {
            let genresDB = await Genre.findOne({ where: { name: g } })
            addedGame.addGenre(genresDB)
        })

        res.send('Videogame was added to database')

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
