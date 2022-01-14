require('dotenv').config({path: 'config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
const connectDB = require('./server/database/connection');
const router = require('./server/routes/router');

const app = express();

// localhost:3000
let PORT = process.env.PORT;

// mongoDB cloud connection
connectDB().catch(err => console.log(err));

// parse request to body-parser
app.use(bodyParser.urlencoded({extended: false}));

// set view engine
app.set('view engine', 'ejs');

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// create session
const store = new MongoDBSession({
    uri: process.env.MONGO_URI,
    collection: 'mySession'
});

app.use(session({
    secret: process.env.ADMIN_TOKEN,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

// navigating to router
app.use('/', router);

// Start the server
if (PORT == null || PORT === "") {
    PORT = 3000;
}

app.listen(PORT, () => {
    console.log('Server has started successfully.');
});