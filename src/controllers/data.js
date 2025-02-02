const {Router} = require('express')

const dataRouter = Router();

dataRouter.get('/bedroom/:id', async(req,res) => {
    
})
dataRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {dataRouter}
