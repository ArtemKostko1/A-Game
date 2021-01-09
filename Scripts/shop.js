const {Router} = require('express');
const Game = require('../models/game');
const router = Router();

router.get('/', async (req, res) => {
    const shopGames = await Game.find()
    .populate('userId', 'login password')
    .select('imgUrl name genre description releaseDate developer ageLimit raiting');
    
    res.render('shop', {
        title: 'A-Game | Shop',
        isShop: true,
        shopGames
    });
});

module.exports = router;