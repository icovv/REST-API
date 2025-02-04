const {Schema,model} = require('mongoose');

const diningRoomSchema = new Schema({
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

const diningRoom = model('diningRoom', diningRoomSchema);
module.exports = {diningRoom}