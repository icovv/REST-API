const {Schema,model} = require('mongoose');

const decorSchema = new Schema({
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

const Decor = model('Decor', decorSchema);
module.exports = {Decor}