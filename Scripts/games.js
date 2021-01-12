const {Router} = require('express');
const Game = require('../models/game');
const authorization = require('../middleware/authorization');
const router = Router();

router.get('/', authorization, async (req, res) => {
    const games = await Game.find()
    .populate('userId', 'login password')
    .select('imgUrl name genre description releaseDate developer ageLimit raiting');

    res.render('games', {
        title: 'A-Game | Games',
        isGames: true,
        games
    });
});

router.post('/', authorization, async (req, res) => {
    const game = new Game({
        imgUrl: req.body.imgUrl,
        name: req.body.name,
        genre: req.body.genre,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        developer: req.body.developer,
        ageLimit: req.body.ageLimit,
        rating: 0,
        userId: req.user
    });

    try{
        await game.save();
        res.redirect('/games');
    } catch(err){
        console.log(err);
    }
});

router.post('/gameEditing', authorization, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;

    await Game.findByIdAndUpdate(id, req.body);
    res.redirect('/games/#games');
});

router.get('/:id/gameEditing', authorization, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    try{
        const game = await Game.findById(req.params.id);
    
        res.render('gameEditing', {
            title: 'A-Game | Game Editing',
            game
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/remove', authorization, async (req, res) => {
    try{
        const {id} = req.body;
        delete req.body.id;

        await Game.deleteOne({_id: id});
        res.redirect('/games');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;