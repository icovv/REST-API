const {Router} = require('express')
const {isAdmin, isUser} = require('../midlewares/guards')
const dataRouter = Router();
const multer = require('multer')
const {Bedroom} = require('../models/bedroom')

const storage = multer.memoryStorage();
const upload = multer({storage:storage})

// dataRouter.get('/bedroom/:id', async(req,res) => {
//     const {id } = req.params;

//     try {
//         const image = await Bedroom.findById(id);
//         if(!image){
//             return res.status(400).send("image not found");
//         }
//         res.send({
//             image: image.picture.toString('base64'),
//             tittle: image.tittle,
//             price: image.price,
//             description: image.description,
//             characteristics: image.characteristics,
//             contentType: image.contentType});
//     } catch (error) {
//         console.error('Error fetching image:', error);
//         res.status(500).send('Error fetching image');
//     }
// })
dataRouter.get('/bedroom/:id', async(req,res) => {
    const {id } = req.params;

    try {
        const item = await Bedroom.findById(id);
        if(!item){
            return res.status(400).send("Bedroom item not found!");
        }
        res.send({
            picture: item.picture.toString('base64'),
            tittle: item.tittle,
            price: item.price,
            description: item.description,
            characteristics: item.characteristics,
            contentType: item.contentType});
    } catch (error) {
        console.error('Error fetching bedroom item:', error);
        res.status(500).send({ code: 500, message: 'Error fetching bedroom item!'});
    }
})
dataRouter.post('/admin/bedroom',isUser(),isAdmin(),upload.single('image'), async(req,res) => {
    const {tittle,price,description,characteristics} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    let item = new Bedroom({
        tittle,
        price,
        description,
        characteristics,
        picture: buffer,
        contentType: mimetype
    })

    try {
        await item.save();
        res.status(200).json({ code: 200, message: 'Bedroom item uploaded successfully!', imageId: item._id });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ code: 500, message: 'Error uploading bedroom item!'});
      }

})

dataRouter.delete('/admin/bedroom/:id',isUser(),isAdmin(), async(req,res) => {
    let {id} = req.params;

    try {
        const item = await Bedroom.findByIdAndDelete(id);
        if(!item) {
            res.status(404).json({code:404, message:"Bedroom item not found!"})
        }
        res.status(200).json({code:200, message: 'Bedroom item deleted successfully!' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({code:500, message: 'Error deleting bedroom item!' });
    }
})
dataRouter.put('/admin/bedroom/:id',isUser(),isAdmin(),upload.single('image'), async(req,res) => {
    let {id} = req.params;
    const {tittle,price,description,characteristics} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    try {
        let item = await Bedroom.findByIdAndUpdate(
            id,
            {
                tittle:tittle,
                price: price,
                description: description,
                characteristics: characteristics,
                picture: buffer,
                contentType: mimetype
            },
            {new: true}
        );
        if(!item){
            res.status(404).json({code:404, message:"Bedroom item not found!"})
        }

        res.status(200).send({
            code: 200,
            message: 'Bedroom item changed successfully',
            itemId: item._id,
            picture: item.picture.toString('base64'),
            tittle: item.tittle,
            price: item.price,
            description: item.description,
            characteristics: item.characteristics,
            contentType: item.contentType});
      } catch (error) {
        console.error('Error changing image:', error);
        res.status(500).send({ code: 500, message: 'Error changing Bedroom item'});
      }

})

module.exports = {dataRouter}
