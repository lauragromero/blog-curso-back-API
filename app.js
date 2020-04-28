'use strict'

const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const express = require('express');


const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";
const port = process.env.PORT || 3002; 

const adminUsersDefault = require('./db/load_admins');
const defaultOffensiveWords = require('./db/defaultOffensiveWords');

const app = express();

const routes = require('./routes/routes')


//rutas
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(express.json());
app.use('/', routes);


//conexión a la base de datos 
async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
    adminUsersDefault();
    defaultOffensiveWords();
    
    console.log("Connected to Mongo");
}

async function main() {
    await dbConnect();
    app.listen(port, () => console.log(`Server started in port ${port}`));
}

main();

module.exports= app; 