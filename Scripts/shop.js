const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('shop', {
        title: 'A-Game Shop',
        isShop: true
    });
});

module.exports = router;