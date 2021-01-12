const {Router} = require('express');
const Game = require('../models/game');
const User = require('../models/user');
const Rating = require('../models/rating');
const authorization = require('../middleware/authorization');
const router = Router();

router.get('/', async (req, res) => {
    const shopGames = await Game.find()
    .populate('userId', 'login password')
    .select('imgUrl name genre description releaseDate developer ageLimit rating');
    
    res.render('shop', {
        title: 'A-Game | Shop',
        isShop: true,
        shopGames
    });
});

router.post('/setRating', authorization, async (req, res) => {
    const {id} = req.body;

    const uid = await Game.User.findOne({ id });

    const {ratingValue} = req.body;

    //const rating = new Rating({userId: id});

    //const game = await Game.count();

    //const raiting = await Game.findById(req.body.id);

    //const value = raiting ;

    //const setRating = await Game.findByIdAndUpdate(id, {raiting: raitingValue+1});

    console.log(uid);
    console.log(ratingValue);
    res.redirect('/shop');
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

router.get('/sortByDate', async (req, res) => {
    try {
        const sortGames = await Game.find(req.body.name).sort({'releaseDate': -1});
        
        res.render('SortByDate', {
            title: 'A-Game | Shop',
            sortGames
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;