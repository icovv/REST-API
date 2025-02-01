const express = require('express')
const {session} = require('../midlewares/session')
const {cors} = require('../midlewares/cors')

const secret = 'Sup3rSecre7'

function configExpress(app){
    app.use(cors());
    app.use(session());
    app.use(express.json());
}

module.exports = {configExpress}
