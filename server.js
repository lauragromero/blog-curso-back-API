'use strict'

const dbConnect = require('./db/dbConnec');
const bodyParser = require ('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes/routes')

//rutas
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use('/', routes);


async function main() {
    await dbConnect();
}
main();

module.exports= app; 