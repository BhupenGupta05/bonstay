const userPlacesRouter = require('express').Router()
const Place = require('../models/place')

userPlacesRouter.get('/', async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    
    try {
        const userPlaces = await Place.find({ owner: user.id });
        res.json(userPlaces);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = userPlacesRouter