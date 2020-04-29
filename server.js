'use strict'

const dbConnect = require('./db/dbConnec');
const bodyParser = require ('body-parser');
const express = require('express');

const app = express();
const routes = require('./routes/routes')

//rutas
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(express.json());
app.use('/', routes);


async function main() {
    await dbConnect();
}
main();

module.exports= app; 