const {Router} = require('express')

const dataRouter = Router();

dataRouter.get('/data', async(req,res) => {
    res.json([]);
})
dataRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {dataRouter}
