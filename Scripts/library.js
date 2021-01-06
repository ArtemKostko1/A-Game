const {Router} = require('express');
const Game = require('../models/game');
const Library = require('../models/library');
const router = Router();

router.get('/', async (req, res) => {
    const library = await Library.fetch();

    res.render('library', {
        title: 'A-Game | Library',
        isLibrary: true,
        games: library.games
    });
});

router.post('/addToLibrary', async (req, res) => {
    const game = await Game.getById(req.body.id);
    await Library.addToLibrary(game);

    res.redirect('/shop');
});

router.delete('/remove/:id', async (req, res) => {
    const library = await Library.remove(req.params.id);
    res.status(200).json(library);
});

module.exports = router;