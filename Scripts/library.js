const {Router} = require('express');
const Game = require('../models/game');
const authorization = require('../middleware/authorization');
const router = Router();

function mapLibraryItems(library) {
    try{
        return library.items.map(g => ({
            ...g.gameId._doc,
            id: g.gameId.id
        }));
    } catch (err) {
        console.log(err);
    }
}

router.get('/', authorization, async (req, res) => {
    const user = await req.user
    .populate('library.items.gameId')
    .execPopulate();

    const games = mapLibraryItems(user.library);

    res.render('library', {
        title: 'A-Game | Library',
        isLibrary: true,
        games: games
    });
});

router.post('/addToLibrary', authorization, async (req, res) => {
    const game = await Game.findById(req.body.id);
    await req.user.addToLibrary(game);

    res.redirect('/shop#game');
});

router.delete('/remove/:id', authorization, async (req, res) => {
    await req.user.removeFromLibrary(req.params.id);
    const user = await req.user.populate('library.items.gameId').execPopulate();

    const games = mapLibraryItems(user.library);
    const library = {
        games
    };

    res.status(200).json(library);
});

module.exports = router;