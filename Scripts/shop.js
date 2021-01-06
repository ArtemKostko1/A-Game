const {Router} = require('express');
const Game = require('../models/game');
const router = Router();

router.get('/', async (req, res) => {
    const shopGames = await Game.getAllGames();

    res.render('shop', {
        title: 'A-Game | Shop',
        isShop: true,
        shopGames
    });
});

module.exports = router;