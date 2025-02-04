const mongoose = require('mongoose');
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
require('../models/user');
require('../models/bedroom');
require('../models/diningRoom');
async function configDB() {
    await mongoose.connect("mongodb://127.0.0.1/database")
    .then(async () => {
        let existing = await User.findOne({'email':"admin@admin.admin"})
        if (!existing){
        let adminUser = new User({
            email: "admin@admin.admin",
            password: await bcrypt.hash("123456",10),
            name:"Admin",
            town: "Admin",
            streetName:"Admin",
            streetNumber: "111",
            tel:1111111111,
        })
        adminUser.save()
        .then(()=>{
            console.log("Admin User successfully created!")
        })
        .catch((err) => {
            console.log("Could not create Admin User", err)  
        })
        }
    })
    .catch((err) => {
        console.log("Error with the connection to MongoDB", err)
    });
    console.log('db works');
}
module.exports ={configDB};