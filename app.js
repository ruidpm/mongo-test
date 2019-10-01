require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

let DEV_DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}${DB_URL}`;
let mongoDB = DEV_DB_URL; 

const PORT = 9999;

const reservation = require('./routes/reservation.route');
const app = express();


mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/reservations', reservation);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});

