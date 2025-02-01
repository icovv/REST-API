const express = require('express');
const { configDB } = require('./config/configBase');
const { configExpress } = require('./config/configExpress');
const { configRoutes } = require('./config/configRoutes');

start();

async function start() {
    const app = express();
    await configDB();
    configExpress(app);
    configRoutes(app);
    app.listen(3000, () => {console.log('Server started http://localhost:3000')})
}

