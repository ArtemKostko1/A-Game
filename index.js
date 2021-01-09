//Modules
const {createServer} = require('http');
const PORT = 3000;
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');

//Routes
const homeRoutes = require('./Scripts/home');
const shopRoutes = require('./Scripts/shop');
const libraryRoutes = require('./Scripts/library');
const supportRoutes = require('./Scripts/support');
const gamesRoutes = require('./Scripts/games');

//Models
const User = require('./models/user');

//init handlebars 
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'Pages');

app.use(async (req, res, next) => {
    try{
        const user = await User.findById('5ff9c1f6e9cc161fd86b7229');
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
});

app.use(express.static(path.join(__dirname, 'Scripts')));
app.use(express.static('Styles/CSS'));
app.use(express.static('Images'));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/library', libraryRoutes);
app.use('/support', supportRoutes);
app.use('/games', gamesRoutes);

async function start() {
    try{
        const connectionstring = 'mongodb+srv://Artem:root@agamecluster.hnoyp.mongodb.net/AGameDB';
        await mongoose
            .connect(connectionstring, {
                useNewUrlParser: true,
                useFindAndModify: false
            },
        )
        .then(() => console.log('MongoDb connected'))
        .catch(err => console.log(err));

        const created = await User.findOne();
        if (!created) {
            const user = new User({
                name: 'Artem',
                surname: 'Kostko',
                email: 'artik.kostko@gmail.com',
                dateOfBirth: '2002-02-24',
                login: 'admin',
                password: 'root',
                library: {items: []}
            });
            await user.save();
        }

        const server = createServer(app);
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
        
    } catch (err) {
        console.log(err);
    }
}

start();

