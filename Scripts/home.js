const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'A-Game Home',
        isHome: true
    });
});

module.exports = router;