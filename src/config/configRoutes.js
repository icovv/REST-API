const {adminRouter} = require('../controllers/adminData');
const {userRouter} = require('../controllers/user');
const {dataRouter} = require('../controllers/data')



function configRoutes(app){
    app.use(dataRouter);
    // app.use('/admin', adminRouter);
    app.use(userRouter)
}

module.exports = {configRoutes};