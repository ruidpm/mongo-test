const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let DEV_DB_URL = 'mongodb+srv://dev_user:passwordfordev@boatservice-rbeer.mongodb.net/test';
let mongoDB = process.env.MONGODB_URI || DEV_DB_URL; 

const PORT = 9999;

const client = require('./routes/client.route');
const app = express();


mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/clients', client);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});

