function isUser(){
    return function (req,res,next){
        if(!req.user){
            res.status(401);
            res.json({code:403,message:"Unauthorized actions not allowed!"})
        } else {
            next()
        }
    }
}

function isGuest(){
    return function (req,res,next){
        if(req.user){
            res.status(403);
            res.json({code:403,message:"You have already signed up!"})
        } else {
            next()
        }
    }
}

function isAdmin(){
    return function(req,res,next){
        if(!(req.user.email === 'admin@admin.admin')){
            res.status(403);
            res.json({code:403,message:"You have to be an admin in order to do this!"})
        } else {
            next();
        }
    }
}

module.exports = {isGuest,isUser, isAdmin}