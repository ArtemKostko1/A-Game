const {body} = require('express-validator');

exports.registrationValidators = [
    body('email', 'Enter correct email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6}),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]