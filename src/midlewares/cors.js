function cors(){
    return function (req,res,next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', 'OPTIONS, GET, POST, PUT, DELTE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

        next();
    }
}

module.exports = {cors}