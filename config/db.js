const util = require('util');
var mysql = require('mysql');

// Set database connection
const CONFIG = {
  host: '192.168.100.8',
  user: 'root',
  password: 'vietis@123',
  database: 'payslip',
  port: 3306,
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'payments',

};

function makeDb() {
  const connection = mysql.createConnection( CONFIG );
  return {
    query( sql, args ) {
      return require('util').promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return require('util').promisify( connection.end ).call( connection );
    }, 
    beginTransaction() {
      return require('util').promisify( connection.beginTransaction )
        .call( connection );
    },
    commit() {
      return require('util').promisify( connection.commit )
        .call( connection );
    },
    rollback() {
      return require('util').promisify( connection.rollback )
        .call( connection );
    }
  };
}
// Create a MySQL connection
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : CONFIG.host,
//   user            : CONFIG.user,
//   password        : CONFIG.password,
//   database        : CONFIG.database,
//   port            : CONFIG.port
// });

// Export the connection
module.exports = makeDb;