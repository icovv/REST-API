const mongoose = require('mongoose');

async function configDB() {
    await mongoose.connect("mongodb://127.0.0.1/database");
    console.log('db works');
}

module.exports ={configDB};