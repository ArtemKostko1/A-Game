const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = Router();

router.get('/', async (req, res) => {
    res.render('authorization', {
        title: 'A-Game | Authorization',
        isAuthorization: true,
        signInError: req.flash('signInError'),
        regError: req.flash('regError')
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/home');
    });
});

function checkAdmin(created) {
    if (created.login === 'admin'){
        return true;
    } else {
        return false;
    }
}

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

                    if (checkAdmin(created) == true) {
                        req.session.isAdmin = true;
                        res.redirect('/games');
                    } else {
                        res.redirect('/home');
                    } 
                });
            } else {
                req.flash('signInError', 'Your password is incorrect');
                res.redirect('/');
            }

        } else {
            req.flash('signInError', 'Such user does not exist');
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
            req.flash('regError', 'This user does exist yet');
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