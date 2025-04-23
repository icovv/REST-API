function isUser(){
    return function (req,res,next){
            if(!req.headers['x-authorization']){
                res.status(403);
                res.json({code:403,message:"Unauthorized actions not allowed!"});
            } else {
                next();
            }
    }
}

function isGuest(){
    return function (req,res,next){
        if(req.headers['x-authorization']){
            res.status(403);
            res.json({code:403,message:"You have already signed up!"})
        } else {
            next()
        }
    }
}

function isAdmin(){
    return function(req,res,next){
        console.log(req.user.email);
        if(!(req.body.email === 'admin@admin.admin' || req.user.email === 'admin@admin.admin')){
            res.status(403).json({code:401,message:"You have to be an admin in order to do this!"})
        } else if(req.body.admin == true || req.user.email === 'admin@admin.admin') {
            next();
        }
    }
}

module.exports = {isGuest,isUser, isAdmin}