function cors(){
    return function (req,res,next){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // change for your website
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type , X-Authorization');

        next();
    }
}

module.exports = {cors}