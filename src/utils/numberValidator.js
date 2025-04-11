function numberValidator(number){
    let numPatter = /\d+/

    if(!numPatter.test(number)){
        return false;
    }
    return true;

}

module.exports={numberValidator}