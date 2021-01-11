const {Schema, model} = require('mongoose');

const ratingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Rating', ratingSchema);