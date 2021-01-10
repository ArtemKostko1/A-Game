//Modules
const {createServer} = require('http');
const PORT = 3000;
const connectionstring = 'mongodb+srv://Artem:root@agamecluster.hnoyp.mongodb.net/AGameDB';
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('./middleware/variables');

//Routes
const authorizationRoutes = require('./Scripts/authorization');
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

const store = new MongoStore({
    collection: 'sessions',
    uri: connectionstring
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'Pages');

app.use(express.static(path.join(__dirname, 'Scripts')));
app.use(express.static('Styles/CSS'));
app.use(express.static('Images'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(varMiddleware);

app.use('/', authorizationRoutes);
app.use('/home', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/library', libraryRoutes);
app.use('/support', supportRoutes);
app.use('/games', gamesRoutes);

async function start() {
    try{
        await mongoose
            .connect(connectionstring, {
                useNewUrlParser: true,
                useFindAndModify: false
            },
        )
        .then(() => console.log('MongoDb connected'))
        .catch(err => console.log(err));

        const server = createServer(app);
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
        
    } catch (err) {
        console.log(err);
    }
}

start();

