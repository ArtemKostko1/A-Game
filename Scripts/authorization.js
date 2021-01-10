const {Router} = require('express');
const bcrypt = require('bcryptjs');
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
    });
});

router.post('/signIn', async (req, res) => {
    try{
        const {login, password} = req.body;

        const created = await User.findOne({ login });

        if (created) {
            const areSame = await bcrypt.compare(password, created.password);

            if (areSame) {
                req.session.user = created;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err){
                        throw err;
                    }
                    res.redirect('/home');
                });
            } else {
                res.redirect('/');
            }

        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.log(err);
    }
});

router.post('/registration' , async (req, res) => {
    try{
        const {name, surname, email, login, password, confirmPassword} = req.body;

        const created = await User.findOne({ login });
        if (created) {
            res.redirect('/');
            
        } else {
            const hashPassword = await bcrypt.hash(password, 10);

            const user = new User({ name, surname, email, login, password: hashPassword, cart: {items: []} });

            await user.save();
            res.redirect('/');
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;