const {Router} = require('express');
const {body,validationResult} = require('express-validator');
const { login } = require('../services/userService');
const { createToken } = require('../services/jwt');

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
            accessToken
        })
    } catch (error) {
        res.status(403);
        res.json({
            code:403,
            message: "Incorrect Email or Password",
        });
    }

})
userRouter.post('/register', async(req,res) => {
    
})
userRouter.get('/logout', async(req,res) => {
    
})

module.exports ={userRouter}

