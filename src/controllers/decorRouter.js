const {Router} = require('express')
const {isAdmin, isUser} = require('../midlewares/guards')
const multer = require('multer')
const {Decor} = require('../models/decor')
const {body,validationResult} = require('express-validator');
const {fileFilter} = require('../midlewares/fileFilter')
const {parseError} = require('../utils/errorParser');
const { numberValidator } = require('../utils/numberValidator');

const decorRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});



decorRouter.get('/decor', async(req,res) => {
    try {
        const items = await Decor.find().lean();
        if(items.length > 0){
            items.forEach(
                (el) => {
                    el.picture.toString("base64")
                    el.cat = "decor"});
        }
        res.status(200).json({code: 200, items: items});
    } catch (error) {
        res.status(500).json({ code: 500, message: ['Error fetching Decor items!']});
    }
})

decorRouter.get('/decor/:id', async(req,res) => {
    const {id } = req.params;

    try {
        if(!id){
            return res.status(404).json({code: 404, message:["Please provide an ID!"]});
        }
        const item = await Decor.findById(id).lean();
        if(!item){
            return res.status(404).json({code: 404, message:["Decor item not found!"]});
        }
        res.status(200).json({
            cat : "decor",
            itemId: item._id,
            picture: item.picture.toString('base64'),
            col: item.col,
            tittle: item.tittle,
            price: item.price,
            description: item.description,
            characteristics: item.characteristics,
            contentType: item.contentType});
    } catch (error) {
        if(error.kind){
            res.status(404).json({code: 404, message: ["No such item ID in our Database!"]})
            return;
        }
        res.status(500).json({ code: 500, message: ['Error fetching Decor item!']});
    }
})
decorRouter.post('/admin/decor',
    isUser(),
    isAdmin(),
    upload.single('image'),
    fileFilter(),
    body('title').trim().custom(value => {

        if(value == ""){
            throw new Error('Please enter valid title!')
        };

        return true;

    }),
    body('price').trim().custom(value => {
        if (value == "" || !numberValidator(value)){
            throw new Error("Please enter valid price!")
        }

        return true;

    }),
    async(req,res) => {
    const {title,price,description,characteristics,col} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    let item = new Decor({
        tittle:title,
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
            console.log("vleznah tuk v resultValid",isResultValid.errors);
            let parsedErr = parseError(error)
            res.status(500).json({ code: 500, message: Object.values(parsedErr.errors)});
            return;
        }
        await item.save();
        res.status(200).json({ code: 200, message: ['Decor item uploaded successfully!'], itemId: item._id });
      } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: ["An error occured while loading your item!"]});
      }

})

decorRouter.delete('/admin/decor/:id',isUser(),isAdmin(), async(req,res) => {
    let {id} = req.params;

    try {
        const item = await Decor.findByIdAndDelete(id).lean();
        if(!item) {
            res.status(404).json({code:404, message:["Decor item not found!"]})
            return;
        }
        res.status(200).json({code:200, message: ['Decor item deleted successfully!'] });
    } catch (error) {
      res.status(500).json({code:500, message: ['Error deleting Decor item!'] });
    }
})
decorRouter.put('/admin/decor/:id',
    isUser(),
    isAdmin(),
    upload.single('image'),
    fileFilter(),
    body('title').trim().custom(value => {

        if(value == ""){
            throw new Error('Please enter valid title!')
        };

        return true;

    }),
    body('price').trim().custom(value => {
        if (value == "" || !numberValidator(value)){
            throw new Error("Please enter valid price!")
        }

        return true;

    }),
    async(req,res) => {
    let {id} = req.params;
    const {title,price,description,characteristics,col} = req.body;
    let originalName = ""
    let buffer = ""
    let mimetype = ""

    if(req.file){
    originalName = req.file.originalName;
    buffer = req.file.buffer;
    mimetype = req.file.mimetype;
    }

    try {
        const isResultValid = validationResult(req);
        if (isResultValid.errors.length){
            let parsedErr = parseError(error)
            res.status(500).json({ code: 500, message: Object.values(parsedErr.errors)});
        }
        let item = null
        if(req.file){
        item = await Decor.findByIdAndUpdate(
                id,
                {
                    tittle:title,
                    col:col,
                    price: price,
                    description: description,
                    characteristics: characteristics,
                    picture: buffer,
                    contentType: mimetype
                },
                {new: true}
            ).lean();
        } else{
            console.log("vleznah tuka")
        item = await Decor.findByIdAndUpdate(
            id,
            {
                tittle:title,
                col:col,
                price: price,
                description: description,
                characteristics: characteristics,
            },
            {new: true}
        ).lean();
        }
        if(!item){
            res.status(404).json({code:404, message:["Decor item not found!"]})
        }

        res.status(200).json({
            cat : "decor",
            code: 200,
            message: ['Decor item changed successfully'],
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

module.exports = {decorRouter}
