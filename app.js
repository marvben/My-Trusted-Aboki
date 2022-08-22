require('dotenv').config();
const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');




// Create the Express application
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Imports all of the routes from ./routes/routes.js
app.use(routes);



/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});