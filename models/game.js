const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    ageLimit: {
        type: Number,
        required: true
    },
    rating: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

gameSchema.method('toClient', function() {
    const game = this.toObject();

    game.id = game._id;
    delete game._id;

    return game;
});

module.exports = model('Game', gameSchema);