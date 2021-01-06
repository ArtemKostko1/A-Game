const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('support', {
        title: 'A-Game | Support',
        isSupport: true
    });
});

module.exports = router;