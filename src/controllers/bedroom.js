const {Router} = require('express')

const bedroomRouter = Router();

bedroomRouter.get('/', async(req,res) => {
    res.json([]);
})
bedroomRouter.get('/', async(req,res) => {
    res.json({});
})

module.exports = {bedroomRouter}
