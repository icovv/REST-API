const {userRouter} = require('../controllers/userRouter');
const {bedroomRouter} = require('../controllers/bedroomRouter');
const { diningRoomRouter } = require('../controllers/diningRoomRouter');
const { decorRouter } = require('../controllers/decorRouter');



function configRoutes(app){
    app.use(bedroomRouter);
    app.use(userRouter)
    app.use(diningRoomRouter)
    app.use(decorRouter)
}

module.exports = {configRoutes};