const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'Data',
    'library.json'
);

class Library {
    static async addToLibrary(game) {
        const library = await Library.fetch();

        const index = library.games.findIndex(g => g.id === game.id);
        const added = library.games[index];

        if(added) {
            //game was added
            return;
        } else {
            //game add
            library.games.push(game);
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(library), err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });
    }

    static async remove (id) {
        const library = await Library.fetch();
        const index = library.games.findIndex(g => g.id === id);
        const game = library.games[index];

        library.games = library.games.filter(g => g.id !== id);

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(library), err => {
                if(err) {
                    reject(err);
                } else {
                    resolve(library);
                }
            });
        });
    }
}

module.exports = Library;