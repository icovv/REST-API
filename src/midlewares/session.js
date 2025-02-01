const { verifyToken } = require('../services/jwt');

function session(){
    return function(req,res,next) {
        const token = req.headers['x-authorization']
        if (token){
            try {
                const sessionData = verifyToken(token);
                req.user = {
                    email: sessionData.email,
                    _id: sessionData._id
                };
                res.locals.hasUser = true;
            } catch (error) {
                res.status(403);
                res.json({code:403,message:"Invalid or expired token"})
                return;
            }
        }
    
        next()
    }
}

module.exports = { session}