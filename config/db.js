
var mysql = require('mysql');

// Set database connection
const CONFIG = {
  host: '192.168.100.8',
  user: 'root',
  password: 'vietis@123',
  database: 'payslip'
};

// Create a MySQL connection
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : CONFIG.host,
  user            : CONFIG.user,
  password        : CONFIG.password,
  database        : CONFIG.database
});

// Export the connection
module.exports = pool;