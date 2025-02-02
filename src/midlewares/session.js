const { verifyToken } = require('../services/jwt');

function session(){
    return function(req,res,next) {
        const token = req.headers['x-authorization']
        console.log(token);
        if (token){
            try {
                const sessionData = verifyToken(token);
                req.user = {
                    email: sessionData.email,
                    _id: sessionData._id
                };
                console.log(req.user.email);
                res.locals.hasUser = true;
                // req.locals.isAdmin = req.user.email === "admin@admin.admin" ? true : false;
            } catch (error) {
                res.status(403);
                res.json({code:403,message:"Invalid or expired token"})
                // req.locals.isAdmin = false;
                return;
            }
        }
        // req.locals.isAdmin = false;
        next()
    }
}

module.exports = { session}