function stringValidator(string){
    let textPattern = /^[a-zA-Z]+$/;

    if(!textPattern.test(string)){
        return false;
    }
    return true;

}

module.exports={stringValidator}