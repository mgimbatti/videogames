const { Router } = require('express');
const getVideogames = require('./getVideogames');
const getGenresRouter = require('./getGenres');
const getVideogameIdRouter = require('./getVideogameId')
const addVideogameRouter = require('./addVideogame')
const getAllPlatforms = require('./getPlatforms')
const getFifteenVideogames = require('./getFifteen')

const router = Router();

router.use('/videogames', getVideogames);
router.use('/genres', getGenresRouter);
router.use('/videogame', getVideogameIdRouter);
router.use('/videogame', addVideogameRouter);
router.use('/platforms', getAllPlatforms);
router.use('/fifteen', getFifteenVideogames)

module.exports = router;
