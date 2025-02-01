const {Router} = require('express')

const dataRouter = Router();

dataRouter.get('/', async(req,res) => {
    res.json([]);
})
dataRouter.get('/:id', async(req,res) => {
    res.json({});
})

module.exports = {dataRouter}
