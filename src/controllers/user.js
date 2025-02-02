const {Router} = require('express');
const {body,validationResult} = require('express-validator');
const { login, register } = require('../services/userService');
const { createToken } = require('../services/jwt');
const { parseError } = require('../utils/errorParser');
const { isGuest, isUser } = require('../midlewares/guards');

const userRouter = Router();

userRouter.post('/login', 
    body('email').trim(),
    body('password').trim(),
    async(req,res) => {
    try {
        const result = await login(req.body.email,req.body.password);
        const accessToken = createToken({email:result.email,_id:result._id});
        res.json({
            _id: result._id,
            email: result.email,
            name:result.name,
            town: result.town,
            streetName: result.streetName,
            streetNumber: result.streetNumber,
            tel: "0" + result.tel,
            accessToken
        })
    } catch (error) {
        res.status(403);
        res.json({
            code:403,
            message: ["Incorrect Email or Password"],
        });
    }

})
userRouter.post('/register', isGuest(),
    body('email').trim().isEmail().withMessage('Please enter valid email!'),
    body('password').trim().isLength({min:6}).withMessage('Password must be at least 4 characters long!'),
    body('name').trim().isString().isLength({min:1}).withMessage('Please enter valid name!'),
    body('town').trim().isString().isLength({min:1}).withMessage('Please enter valid town name!'),
    body('streetName').trim().isString().isLength({min:1}).withMessage('Please enter valid street name!'),
    body('streetNumber').trim().isNumeric().isLength({min:1}).withMessage('Please enter valid street number!'),
    body('tel').trim().isNumeric().isLength({min:10,max:10}).withMessage('Please enter valid telephone number!'),

    async(req,res) => {
        const {email,password,name,town,streetName,streetNumber,tel} = req.body
        try {
            console.log(req.body);
            const isResultValid = validationResult(req);
            if (isResultValid.errors.length){
                throw isResultValid.errors
            }
            const result = await register(email,password,name,town,streetName,streetNumber,tel);
            let accessToken = createToken({email:result.email,_id:result._id});
            res.json({
                _id: result._id,
                email: result.email,
                name:result.name,
                town: result.town,
                streetName: result.streetName,
                streetNumber: result.streetNumber,
                tel: "0" + result.tel,
                accessToken
            })
        } catch (error) {
            const parserd = parseError(error);
            res.status(403);
            res.json({code: 403, message: Object.values(parserd.errors)})
        }
})
userRouter.get('/logout',isUser(), async(req,res) => {
    res.status(200);
    res.json({code:200, message:["You have successfully logged out!"]})
})

module.exports ={userRouter}

