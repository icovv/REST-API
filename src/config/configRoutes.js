const {dataRouter} = require('../controllers/adminData');
const {adminRouter} = require('../controllers/data');
const {userRouter} = require('../controllers/user');



function configRoutes(app){
    app.use('/data', dataRouter);
    app.use('/admin', adminRouter);
}

module.exports = {configRoutes};