const express = require('express');
const path = require('path');
const app = express();

const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const shopRoutes = require('./routes/shop');
const libraryRoutes = require('./routes/library');
const supportRoutes = require('./routes/support');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs' 
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'Pages');

app.use(express.static('Styles/CSS'));

app.use('/', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/library', libraryRoutes);
app.use('/support', supportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});