const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get('/', async (req, res) => {
    res.render('authorization', {
        title: 'A-Game | Authorization',
        isAuthorization: true
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

router.post('/signIn', async (req, res) => {
    const user = await User.findById('5ff9c1f6e9cc161fd86b7229');
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if (err){
            throw err;
        }
        res.redirect('/home');
    });
});

module.exports = router;