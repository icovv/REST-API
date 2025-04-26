const {Schema,model} = require('mongoose');

const bedroomSchema = new Schema({
    tittle: {
        type:String,
        required:true,
    },
    col: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type:String,
    },
    characteristics: {
        type: String,
    },
    picture: {
        type: Buffer,
        required:true
    },
    contentType: {
        type: String,
        required: true
    }
    // ,
    // createdOn:{
    //     type:Date,
    //     required:true
    // }
})

const Bedroom = model('Bedroom', bedroomSchema);
module.exports = {Bedroom}