const {Schema,model} = require('mongoose');

const decorSchema = new Schema({
    tittle: {
        type:String,
        required:true,
    },
    col: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type:String,
        required:true
    },
    characteristics: {
        type: String,
        required:true
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

const Decor = model('Decor', decorSchema);
module.exports = {Decor}