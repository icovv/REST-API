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
        const image = await Bedroom.findById(id);
        if(!image){
            return res.status(400).send("image not found");
        }
        res.send({
            image: image.picture.toString('base64'),
            tittle: image.tittle,
            price: image.price,
            description: image.description,
            characteristics: image.characteristics,
            contentType: image.contentType});
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send({ code: 500, message: 'Error fetching image'});
    }
})
dataRouter.post('/admin/bedroom',isUser(),isAdmin(),upload.single('image'), async(req,res) => {
    const {tittle,price,description,characteristics} = req.body;
    const {originalName, buffer, mimetype} = req.file;

    let bedroomWithImg = new Bedroom({
        tittle,
        price,
        description,
        characteristics,
        picture: buffer,
        contentType: mimetype
    })

    try {
        await bedroomWithImg.save();
        res.status(200).json({ code: 200, message: 'Image uploaded successfully', imageId: bedroomWithImg._id });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ code: 500, message: 'Error uploading image'});
      }

})

dataRouter.delete('/admin/bedroom/:id', async(req,res) => {
    let {id} = req.params;

    try {
        
    } catch (error) {
        
    }
})

module.exports = {dataRouter}
