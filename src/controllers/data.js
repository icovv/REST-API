const {Router} = require('express')
const {isAdmin, isUser} = require('../midlewares/guards')
const dataRouter = Router();

dataRouter.get('/bedroom/:id', async(req,res) => {
    
})
dataRouter.post('/admin/bedroom',isUser(),isAdmin(), async(req,res) => {
    res.json("you did it!");
})

dataRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {dataRouter}
