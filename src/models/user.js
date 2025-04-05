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
    },
    town: {
        type: String,
    },
    streetName: {
        type: String,
    },
    streetNumber: {
        type: Number,
    },
    tel: {
        type: Number,
    },
    admin:{
        type: Boolean,
    }
},{
    collation: {
    locale: 'en',
    strength: 2
    } 
});

const User = model('User', userSchema);
module.exports = {User};