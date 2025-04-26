const {Schema,model} = require('mongoose');

const diningRoomSchema = new Schema({
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

const DiningRoom = model('DiningRoom', diningRoomSchema);
module.exports = {DiningRoom}