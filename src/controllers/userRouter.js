const {Router} = require('express');
const {body,validationResult} = require('express-validator');
const { login, register, getProfileData, changeProfileData } = require('../services/userService');
const { createToken } = require('../services/jwt');
const { parseError } = require('../utils/errorParser');
const { isGuest, isUser } = require('../midlewares/guards');
const req = require('express/lib/request');

const userRouter = Router();

userRouter.post('/login',
    isGuest(), 
    body('email').trim(),
    body('password').trim(),
    async(req,res) => {
    try {
        const result = await login(req.body.email,req.body.password);
        const accessToken = createToken({email:result.email,_id:result._id});
        res.status(200).json({
            _id: result._id,
            email: result.email,
            name:result.name,
            town: result.town,
            streetName: result.streetName,
            streetNumber: result.streetNumber,
            tel: result.tel,
            admin:result.admin,
            accessToken
        })
    } catch (error) {
        res.status(403).json({
            code:403,
            message: ["Incorrect Email or Password"],
        });
    }

})
userRouter.post('/register', 
    isGuest(),
    body('email').trim().isEmail().withMessage('Please enter valid email!'),
    body('password').trim().isLength({min:6}).withMessage('Password must be at least 6 characters long!'),
    async(req,res) => {
        const {email,password} = req.body
        try {
            const isResultValid = validationResult(req);
            if (isResultValid.errors.length){
                throw isResultValid.errors
            }
            const result = await register(email,password);
            let accessToken = createToken({email:result.email,_id:result._id});
            res.status(200).json({
                _id: result._id,
                email: result.email,
                name:result.name,
                town: result.town,
                streetName: result.streetName,
                streetNumber: result.streetNumber,
                tel: result.tel,
                admin:result.admin,
                accessToken
            })
        } catch (error) {
            const parserd = parseError(error);
            res.status(403).json({code: 403, message: Object.values(parserd.errors)})
        }
})
userRouter.get('/logout',isUser(), async(req,res) => {
    res.status(204).json({code:204, message:["You have successfully logged out!"]})
})

userRouter.get('/profile', isUser(),
    async(req,res) => {
        try{
        if(!req.body["_id"]){
            throw new Error("Please log into your account in order to view your profile data!")
        }
        let result = await getProfileData(req.body["_id"]);
        res.status(200).json({
            _id: result._id,
            email: result.email,
            name:result.name,
            town: result.town,
            streetName: result.streetName,
            streetNumber: result.streetNumber,
            tel: "0" + result.tel,
            admin:result.admin,
            accessToken: req.headers['x-authorization']
        })
        }catch(error){
            const parserd = parseError(error);
            res.status(403).json({code: 403, message: Object.values(parserd.errors)})
        }
})

userRouter.put('/profile',
    isUser(),
    body('name').trim().isString().isLength({min:1}).withMessage('Please enter valid name!'),
    body('town').trim().isString().isLength({min:1}).withMessage('Please enter valid town name!'),
    body('streetName').trim().isString().isLength({min:1}).withMessage('Please enter valid street name!'),
    body('streetNumber').trim().isNumeric().isLength({min:1}).withMessage('Please enter valid street number!'),
    body('tel').trim().isNumeric().isLength({min:10,max:10}).withMessage('Please enter valid telephone number!'),
    async(req,res) => {
        try {
            if(!req.body["_id"]){
                throw new Error("Please log into your account in order to view your profile data!")
            }
            let result = await changeProfileData(req.body["_id"],req.body.name,req.body.town,req.body.streetName,req.body.streetNumber,req.body.tel);
            res.status(200).json({
                _id: result._id,
                email: result.email,
                name:result.name,
                town: result.town,
                streetName: result.streetName,
                streetNumber: result.streetNumber,
                tel: result.tel,
                admin:result.admin,
                accessToken: req.headers['x-authorization']
            })
        } catch (error) {
            const parserd = parseError(error);
            res.status(403).json({code: 403, message: Object.values(parserd.errors)})
        }

    }
)

// body('name').trim().isString().isLength({min:1}).withMessage('Please enter valid name!'),
// body('town').trim().isString().isLength({min:1}).withMessage('Please enter valid town name!'),
// body('streetName').trim().isString().isLength({min:1}).withMessage('Please enter valid street name!'),
// body('streetNumber').trim().isNumeric().isLength({min:1}).withMessage('Please enter valid street number!'),
// body('tel').trim().isNumeric().isLength({min:10,max:10}).withMessage('Please enter valid telephone number!'),

module.exports ={userRouter}

