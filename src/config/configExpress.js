const express = require('express')
const cookieParser = require('cookie-parser')
const {session} = require('../midlewares/session')

const secret = 'Sup3rSecre7'

function configExpress(app){
    app.use(cookieParser(secret));
    app.use(session());
    app.use(express.json());
}

module.exports = {configExpress}
