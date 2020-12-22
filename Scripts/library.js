const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('library', {
        title: 'A-Game Library',
        isLibrary: true
    });
});

module.exports = router;