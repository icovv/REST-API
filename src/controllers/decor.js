const {Router} = require('express')

const decorRouter = Router();

decorRouter.get('/', async(req,res) => {
    res.json([]);
})
decorRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {decorRouter}
