const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/code_forum_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Databse :: MongoDB');
});


module.exports = db;