'use strict'

const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const express = require('express');
const post = require('./routes/posts');
const word = require('./routes/words');


const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";
const port = process.env.PORT || 3002; 

const app = express();


app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', post);
app.use('/api', word)



async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
    
    console.log("Connected to Mongo");

}

async function main() {

    await dbConnect();

    app.listen(port, () => console.log(`Server started in port ${port}`));
}

main();