//Module to get routes and create an app with some standards to run rightly
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const { urlencoded, json } = require('body-parser');
const router = require('./routes/routes');
const cors = require('cors');

//Enable cors
app.use(cors());
app.options('*', cors());


//Set key
app.set('llave', process.env.ACCESS_TOKEN_SECRET);

//middlewares
app.use(morgan('dev')); // Info about each request in a short format
app.use(urlencoded({ extended: true })); //Set to true to encode requests
app.use(json()); //parse body to JSON

// Requires routes module to call endpoints
app.use('/api', router);


module.exports = app