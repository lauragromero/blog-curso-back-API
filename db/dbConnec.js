
const mongoose = require('mongoose');
const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";
const adminUsersDefault = require('./load_admins');
const defaultOffensiveWords = require('./defaultOffensiveWords');


async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
    
    console.log("Connected to Mongo");
    await adminUsersDefault();
    await defaultOffensiveWords();
    
    
}

module.exports = dbConnect;