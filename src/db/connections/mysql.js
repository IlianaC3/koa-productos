const Connections = require('../db');
const ConnectionO = new Connections();
require('dotenv').config();

const DBP = ConnectionO.Configuration(process.env.DBPRODUCTOS)

module.exports = { DBP };