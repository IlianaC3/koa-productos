const mongoose = require('mongoose');
require('dotenv').config();
const Connections = require('../db');
const ConnectionO = new Connections();

const Connection = async function main() {
    await mongoose.connect(ConnectionO.Configuration(process.env.DBOTHERS).cnxStr, ConnectionO.Configuration(process.env.DBOTHERS).options);
}

module.exports = { Connection, mongoose }