const {userRouter} = require('../controllers/userRouter');
const {bedroomRouter} = require('../controllers/bedroomRouter')



function configRoutes(app){
    app.use(bedroomRouter);
    app.use(userRouter)
}

module.exports = {configRoutes};