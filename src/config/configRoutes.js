const {adminRouter} = require('../controllers/adminData');
const {diningRouter} = require('../controllers/diningRoom');
const {bedroomRouter} = require('../controllers/bedroom');
const {decorRouter} = require('../controllers/decor');
const {userRouter} = require('../controllers/user');



function configRoutes(app){
    app.use('/dining-room',diningRouter);
    app.use('/bedroom',bedroomRouter);
    app.use('/decor',decorRouter);
    // app.use('/admin', adminRouter);
    // app.use('/user', userRouter)
}

module.exports = {configRoutes};