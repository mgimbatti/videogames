const { Router } = require('express');
const router = Router();
const { Platform } = require('../db');
const axios = require('axios');
const { BASE_URL, PLATFORMS_URL } = require('../../constants')
const { API_KEY } = process.env;

router.get('/', async function getAllPlatforms(req, res) {
    try {
        const platforms = await axios.get(`${BASE_URL}${PLATFORMS_URL}?key=${API_KEY}`)
        platforms.data.results && platforms.data.results.map(async (p) => {
            await Platform.findOrCreate({
                where: { id: p.id, name: p.name}
            });
        });
        const platformsDB = await Platform.findAll();
        res.json(platformsDB);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

module.exports = router;
