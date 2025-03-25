const {User} = require('../models/user');
const bcrypt = require('bcrypt')


async function register(email,password) {
    let existing = await User.findOne({'email':email});

    if(existing) {
        throw new Error('This email is already in use!')
    }

    let user = new User({
        email,
        password: await bcrypt.hash(password,10),
        name: '',
        town: '',
        streetName: '' ,
        streetNumber: 0,
        tel: 0
    })
    
    await user.save();
    return user;
}
// async function register(email,password,name,town,streetName,streetNumber,tel) {
//     let existing = await User.findOne({'email':email});
//     let matchingTel = await User.findOne({'tel':tel})

//     if(existing) {
//         throw new Error('This email is already in use!')
//     }

//     if(matchingTel) {
//         throw new Error('This telephone number is already in use!')
//     }

//     let user = new User({
//         email,
//         password: await bcrypt.hash(password,10),
//         name,
//         town,
//         streetName,
//         streetNumber,
//         tel
//     })
    
//     await user.save();
//     return user;
// }

async function login(email, password) {
    const user = await User.findOne({"email":email});
    if (!user){
        throw new Error(`Incorrect email or password`);
    }

    let match = await bcrypt.compare(password,user.password);
    if(!match){
        throw new Error(`Incorrect email or password`);
    }

    return user;
}

async function getProfileData(id){
    let user = await User.findOne({"_id":id});
    if(!user){
        throw new Error('No user with such credentials was found in our DataBase');
    }

    return user;

}

module.exports = {login, register,getProfileData};