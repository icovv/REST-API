const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    streetNumber: {
        type: Number,
        required: true,
    },
    tel: {
        type: Number,
        required: true
    }
},{
    collation: {
    locale: 'en',
    strength: 2
    } 
});

const User = model('User', userSchema);
module.exports = {User};