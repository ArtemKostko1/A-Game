const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
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

function checkAdmin(created) {
    if (created.login === 'admin'){
        return true;
    } else {
        return false;
    }
}

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/home');
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

                    if (checkAdmin(created) == true) {
                        req.session.isAdmin = true;
                        res.redirect('/games');
                    } else {
                        res.redirect('/home');
                    } 
                });
            } else {
                req.flash('regError', '');
                req.flash('signInError', 'Your password is incorrect');
                res.redirect('/#signIn');
            }

        } else {
            req.flash('regError', '');
            req.flash('signInError', 'Such user does not exist');
            res.redirect('/#signIn');
        }

    } catch (err) {
        console.log(err);
    }
});

router.post('/registration', body('email').isEmail(), async (req, res) => {
    try{
        const {name, surname, email, login, password, confirmPassword} = req.body;

        const created = await User.findOne({ login });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/#registration');
        }

        if (created) {
            req.flash('regError', '');
            req.flash('regError', 'This user does exist yet');
            res.redirect('/#registration');
            
        } else {
            const hashPassword = await bcrypt.hash(password, 10);

            const user = new User({ name, surname, email, login, password: hashPassword, library: {items: []} });

            await user.save();

            res.redirect('/#signIn');
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;