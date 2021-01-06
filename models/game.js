const {v4: uuid} = require('uuid');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { rejects } = require('assert');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'Data',
    'games.json'
);

class Game{
    constructor(imgUrl, name, ganre, description, releaseDate, developer, ageLimit){
        this.id = uuid();
        this.imgUrl = imgUrl;
        this.name = name;
        this.ganre = ganre;
        this.description = description;
        this.releaseDate = releaseDate;
        this.developer = developer;
        this.ageLimit = ageLimit;
        this.rating = null;
    }

    toJSON(){
        return{
            id: this.id,
            imgUrl: this.imgUrl,
            name: this.name,
            ganre: this.ganre,
            description: this.description,
            releaseDate: this.releaseDate,
            developer: this.developer,
            ageLimit: this.ageLimit,
            rating: this.rating
        };
    }

    async saveGame(){
        const games = await Game.getAllGames();
        games.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(games), (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static async update(game){
        const games = await Game.getAllGames();
        const index = games.findIndex(g => g.id === game.id);
        games[index] = game;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(games), (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getAllGames(){
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                    if(err) {
                        reject(err);
                    } else{
                        resolve(JSON.parse(content));
                    }
                }
            );
        });
    }

    static async getById(id) {
        const games = await Game.getAllGames();
        return games.find(g => g.id === id);
    }
}

module.exports = Game;