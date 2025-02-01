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

module.exports = {isGuest,isUser}