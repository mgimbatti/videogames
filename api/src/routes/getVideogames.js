// GET /videogames:
// Obtener un listado de los primeras 15 videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { BASE_URL, GAMES_URL } = require('../../constants')
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");

// router.get('/', async function getFifteenVideogames(req, res) {
//     try {
//         const videogamesApi = await axios.get(`${BASE_URL}${GAMES_URL}?key=${API_KEY}`);
//         const gamesApi = videogamesApi.data.results.map((g) => {
//             const content = {
//                 name: g.name,
//                 image: g.background_image,
//                 genres: g.genres.map((g) => g.name),
//                 origin: 'EXISTING',
//                 id: g.id
//             }
//             return content;
//         });
//         const gamesDB = await Videogame.findAll({ limit: 15, include: Genre })

//         let gamesDBJSON = gamesDB.map((g) => g.toJSON())
//         let gamesDBMapFormat = gamesDBJSON.map((g) => ({ name: g.name, genres: g.genres.map((g) => g.name) }))

//         let response = gamesDBMapFormat.concat(gamesApi)

//         res.json(response.slice(0, 15))
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// });

router.get('/', async function getVideogames(req, res) {
    const ceiling = 100 / 20;
    let gameArray = [];
    let url = `${BASE_URL}${GAMES_URL}?key=${API_KEY}`;
    try {
        for (i = 0; i < ceiling; i++) {
            let videogamesApi = (await axios.get(url)).data;
            url = videogamesApi.next;
            let gamesByPage = videogamesApi.results.map((g) => {
                let content = {
                    name: g.name,
                    image: g.background_image,
                    genres: g.genres.map((g) => g.name),
                    origin: 'EXISTING',
                    id: g.id,
                    rating: g.rating
                };
                return content;
            });
            gameArray = gameArray.concat(gamesByPage)
        }

        const gamesDB = await Videogame.findAll({          
            include: Genre
        })
       
        let gamesDBJSON = gamesDB.map((g) => g.toJSON())
        let gamesDBMapFormat = gamesDBJSON.map((g) => ({ 
            name: g.name,
             genres: g.genres.map((g) => g.name),
              image: 'https://www.andiar.com/772-thickbox_default/vinilo-space-invaders.jpg',
              origin: 'NEW',
              id: g.id,
              rating: g.rating,
             }))
        
        gameArray = gameArray.concat(gamesDBMapFormat);
        res.json(gameArray)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get('/:name', async function getVideogamesByName(req, res) {
    const name = req.params.name;
    try {
        const dataApi = await axios.get(`${BASE_URL}${GAMES_URL}?search=${name}&key=${API_KEY}`);
        const gamesApi = dataApi.data.results.map((g) => {
            const content = {
                name: g.name,
                image: g.background_image,
                genres: g.genres.map((g) => g.name),
                origin: 'EXISTING',
                id: g.id,
                rating: g.rating
            }
            return content;
        })

        const gamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                },
            },
            include: Genre
        })

        let gamesDBJSON = gamesDB.map((g) => g.toJSON())
        let gamesDBMapFormat = gamesDBJSON.map((g) => ({ 
            name: g.name, 
            genres: g.genres.map((g) => g.name),
             image: 'https://www.andiar.com/772-thickbox_default/vinilo-space-invaders.jpg',origin: 'NEW' }))

        let response = gamesDBMapFormat.concat(gamesApi)

        res.json(response.slice(0, 15))
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})


module.exports = router;