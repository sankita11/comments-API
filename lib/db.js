const mysql = require('mysql2/promise');
const Config = require('../environment/environment');

const connection = mysql.createPool(Config.dbParams);


module.exports = connection;