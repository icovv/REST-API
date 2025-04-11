function numberValidator(number){
    let numPatter = /\d+/

    if(!numPatter.test(number)){
        return false;
    }
    if(number < 0){
        return false;
    }
    return true;

}

module.exports={numberValidator}