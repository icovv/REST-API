const {Router} = require('express')

const diningRouter = Router();

diningRouter.get('/', async(req,res) => {
    res.json([]);
})
diningRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {diningRouter}
