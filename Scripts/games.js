const {Router} = require('express');
const Game = require('../models/game');
const router = Router();

router.get('/', async (req, res) => {
    const games = await Game.getAllGames();

    res.render('games', {
        title: 'A-Game | Games',
        isGames: true,
        games
    });
});

router.get('/:id/gameEditing', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const game = await Game.getById(req.params.id);
    
    res.render('gameEditing', {
        title: 'A-Game | Game editing',
        game
    });
});

router.post('/', async (req, res) => {
    const game = new Game(req.body.imgUrl, req.body.name, req.body.ganre, req.body.description, 
                          req.body.releaseDate, req.body.developer, req.body.ageLimit);

    await game.saveGame();

    return res.redirect('/games');
});

router.post('/gameEditing', async (req, res) => {
    await Game.update(req.body);

    res.redirect('/games');
});

module.exports = router;