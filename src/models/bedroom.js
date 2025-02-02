const {Schema,model} = require('mongoose');

const bedroomSchema = new Schema({
    tittle: {
        type:String,
        required:true,
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
    pictures: {
        type: Buffer,
        required:true
    },
    createdOn:{
        type:Date,
        required:true
    }
})

const Bedroom = model('Bedroom', bedroomSchema);
module.exports = {Bedroom}