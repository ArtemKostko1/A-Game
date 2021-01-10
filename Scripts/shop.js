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

router.get('/sortByName', async (req, res) => {
    try {
        const sortGames = await Game.find(req.body.name).sort('name');
        
        res.render('sortByName', {
            title: 'A-Game | Shop',
            sortGames
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/sortByAgeLimit', async (req, res) => {
    try {
        const sortGames = await Game.find(req.body.name).sort('ageLimit');
        
        res.render('sortByAgeLimit', {
            title: 'A-Game | Shop',
            sortGames
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/SortByDate', async (req, res) => {
    try {
        const sortGames = await Game.find(req.body.name).sort('releaseDate');
        
        res.render('SortByDate', {
            title: 'A-Game | Shop',
            sortGames
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;