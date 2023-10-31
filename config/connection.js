const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jornal'
});

module.exports = { conn };
