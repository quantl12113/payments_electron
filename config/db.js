
var mysql = require('mysql');

// Set database connection
const CONFIG = {
  // host: '192.168.100.8',
  host: 'localhost',
  user: 'root',
  // password: 'vietis@123',
  password: 'root',
  database: 'payslip',
  port: 8889
};

// Create a MySQL connection
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : CONFIG.host,
  user            : CONFIG.user,
  password        : CONFIG.password,
  database        : CONFIG.database,
  port            : CONFIG.port
});

// Export the connection
module.exports = pool;