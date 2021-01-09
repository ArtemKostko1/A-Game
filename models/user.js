const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    library: {
        items: [
            {
                gameId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Game',
                    require: true
                }
            }
        ]
    }
});

userSchema.methods.addToLibrary = function(game) {
    const items = [...this.library.items];
    const index = items.findIndex(g => {
        return g.gameId.toString() === game._id.toString();
    });

    if (index >= 0) {
        return;
    } else {
        items.push({
            gameId: game._id
        });
    }

    this.library = {items};
    return this.save();
};

userSchema.methods.removeFromLibrary = function(id) {
    let items = [...this.library.items];
    const index = items.findIndex(g => g.gameId.toString() === id.toString());

    items = items.filter(g => g.gameId.toString() !== id.toString());

    this.library = {items};
    return this.save();
};

module.exports = model('User', userSchema);