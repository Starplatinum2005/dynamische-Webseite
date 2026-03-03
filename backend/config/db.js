const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'BOD_Nutzer',
  password: 'BlueOD_WwI02040A_',
  database: 'Datenbank',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); 

module.exports = pool;