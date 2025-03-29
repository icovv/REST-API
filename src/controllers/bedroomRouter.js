const {Router} = require('express')
const {isAdmin, isUser} = require('../midlewares/guards')
const multer = require('multer')
const {Bedroom} = require('../models/bedroom')
const {body,validationResult} = require('express-validator');
const {fileFilter} = require('../midlewares/fileFilter')
const {parseError} = require('../utils/errorParser')

const bedroomRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});



bedroomRouter.get('/bedroom', async(req,res) => {
    try {
        const items = await Bedroom.find().lean();
        console.log(items, "tuk");
        if(items.length < 1){
            return res.status(404).json({code: 404, message:["No Bedroom items were found!"]});
        }
        if(items.length > 0){
        items.forEach((el) => el.picture.toString("base64"))
        }
        res.status(200).json({code: 200, items: items});
    } catch (error) {
        res.status(500).json({ code: 500, message: ['Error fetching bedroom items!']});
    }
})

bedroomRouter.get('/bedroom/:id', async(req,res) => {
    const {id } = req.params;

    try {
        const item = await Bedroom.findById(id).lean();
        if(!item){
            return res.status(404).json({code: 404, message:["Bedroom item not found!"]});
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
        res.status(500).json({ code: 500, message: ['Error fetching bedroom item!']});
    }
})
bedroomRouter.post('/admin/bedroom',
    isUser(),
    isAdmin(),
    upload.single('image'),
    fileFilter(),
    body('tittle').trim().isString().withMessage('Please enter valid tittle!').notEmpty().withMessage('Please enter valid tittle!'),
    body('characteristics').trim().isString().withMessage('Please enter valid characteristics!').notEmpty().withMessage('Please enter valid characteristics!'),
    body('description').trim().isString().withMessage('Please enter valid characteristics!').notEmpty().withMessage('Please enter valid characteristics!'),
    body('price').trim().isNumeric().withMessage("Please enter valid price!").notEmpty().withMessage("Please enter valid price!"),
    body('col').trim().isString().withMessage("Please enter valid collection name!").notEmpty().withMessage("Please enter valid price!"),
    async(req,res) => {
    const {tittle,price,description,characteristics,col} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    let item = new Bedroom({
        tittle,
        col,
        price,
        description,
        characteristics,
        picture: buffer,
        contentType: mimetype
    })

    try {
        const isResultValid = validationResult(req);
        if (isResultValid.errors.length){
            let parsedErr = parseError(error)
            res.status(500).json({ code: 500, message: Object.values(parsedErr.errors)});
        }
        await item.save();
        res.status(200).json({ code: 200, message: ['Bedroom item uploaded successfully!'], itemId: item._id });
      } catch (error) {
        res.status(500).json({ code: 500, message: ["An error occured while loading your item!"]});
      }

})

bedroomRouter.delete('/admin/bedroom/:id',isUser(),isAdmin(), async(req,res) => {
    let {id} = req.params;

    try {
        const item = await Bedroom.findByIdAndDelete(id).lean();
        if(!item) {
            res.status(404).json({code:404, message:["Bedroom item not found!"]})
        }
        res.status(200).json({code:200, message: ['Bedroom item deleted successfully!'] });
    } catch (error) {
      res.status(500).json({code:500, message: ['Error deleting bedroom item!'] });
    }
})
bedroomRouter.put('/admin/bedroom/:id',
    isUser(),
    isAdmin(),
    upload.single('image'),
    fileFilter(),
    body('tittle').trim().isString().withMessage('Please enter valid tittle!').notEmpty().withMessage('Please enter valid tittle!'),
    body('characteristics').trim().isString().withMessage('Please enter valid characteristics!').notEmpty().withMessage('Please enter valid characteristics!'),
    body('description').trim().isString().withMessage('Please enter valid characteristics!').notEmpty().withMessage('Please enter valid characteristics!'),
    body('price').trim().isNumeric().withMessage("Please enter valid price!").notEmpty().withMessage("Please enter valid price!"),
    body('col').trim().isString().withMessage("Please enter valid collection name!").notEmpty().withMessage("Please enter valid price!"),
    async(req,res) => {
    let {id} = req.params;
    const {tittle,price,description,characteristics,col} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    try {
        const isResultValid = validationResult(req);
        if (isResultValid.errors.length){
            let parsedErr = parseError(error)
            res.status(500).json({ code: 500, message: Object.values(parsedErr.errors)});
        }
        let item = await Bedroom.findByIdAndUpdate(
            id,
            {
                tittle:tittle,
                col:col,
                price: price,
                description: description,
                characteristics: characteristics,
                picture: buffer,
                contentType: mimetype
            },
            {new: true}
        ).lean();
        if(!item){
            res.status(404).json({code:404, message:["Bedroom item not found!"]})
        }

        res.status(200).json({
            code: 200,
            message: ['Bedroom item changed successfully'],
            itemId: item._id,
            col: item.col,
            picture: item.picture.toString('base64'),
            tittle: item.tittle,
            price: item.price,
            description: item.description,
            characteristics: item.characteristics,
            contentType: item.contentType});
      } catch (error) {
        res.status(500).json({ code: 500, message: ["An error occured while loading your item!"]});
      }

})

module.exports = {bedroomRouter}
