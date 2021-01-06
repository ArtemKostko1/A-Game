//Modules
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const mongoose = require('mongoose')

//Routes
const homeRoutes = require('./Scripts/home');
const shopRoutes = require('./Scripts/shop');
const libraryRoutes = require('./Scripts/library');
const supportRoutes = require('./Scripts/support');
const gamesRoutes = require('./Scripts/games');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs' 
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'Pages');

app.use(express.static(path.join(__dirname, 'Scripts')));
app.use(express.static('Styles/CSS'));
app.use(express.static('Images'));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/library', libraryRoutes);
app.use('/support', supportRoutes);
app.use('/games', gamesRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try{
        const url = `mongodb+srv://artem:uCkwAF8ADOfhBMic@cluster0.czozb.mongodb.net/test?retryWrites=true&w=majority`;
        await mongoose.connect(url, {useNewUrlParser: true});
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();

