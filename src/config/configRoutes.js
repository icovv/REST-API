const {userRouter} = require('../controllers/userRouter');
const {bedroomRouter} = require('../controllers/bedroomRouter');
const { diningRoomRouter } = require('../controllers/diningRoomRouter');



function configRoutes(app){
    app.use(bedroomRouter);
    app.use(userRouter)
    app.use(diningRoomRouter)
}

module.exports = {configRoutes};