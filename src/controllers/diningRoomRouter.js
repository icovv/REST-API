const {Router} = require('express')
const {isAdmin, isUser} = require('../midlewares/guards')
const multer = require('multer')
const {body,validationResult} = require('express-validator');
const {fileFilter} = require('../midlewares/fileFilter')
const {parseError} = require('../utils/errorParser');
const { DiningRoom } = require('../models/diningRoom');

const diningRoomRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});



diningRoomRouter.get('/dining-room', async(req,res) => {
    try {
        const items = await DiningRoom.find().lean();
        console.log(items, "tuk");
        if(items.length < 1){
            return res.status(400).json({code: 400, message:["No Dining room items were found!"]});
        }
        if(items.length > 0){
        items.forEach((el) => el.picture.toString("base64"))
        }
        res.status(200).json({code: 200, items: items});
    } catch (error) {
        res.status(500).json({ code: 500, message: ['Error fetching Dining room items!']});
    }
})

bedroomRouter.get('/dining-room/:id', async(req,res) => {
    const {id } = req.params;

    try {
        const item = await DiningRoom.findById(id).lean();
        if(!item){
            return res.status(400).json({code: 400, message:["Dining room item not found!"]});
        }
        res.status(200).res.json({
            itemId: item._id,
            picture: item.picture.toString('base64'),
            col: item.col,
            tittle: item.tittle,
            price: item.price,
            description: item.description,
            characteristics: item.characteristics,
            contentType: item.contentType});
    } catch (error) {
        res.status(500).json({ code: 500, message: ['Error fetching Dining room item!']});
    }
})