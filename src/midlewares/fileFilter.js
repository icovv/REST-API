function fileFilter(){
    return function (req,res,next){
    let fileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
    if(!req.file){
        res.status(500).send({ code: 500, message: ["Please make sure you are uploading a picture!"]});
        return; 
    }

    if(!fileTypes.includes(req.file.mimetype)) {
        res.status(500).send({ code: 500, message: ["Please make sure you are uploading a picture!"]});
        return;
    }
    next()
    }
}
module.exports ={fileFilter};