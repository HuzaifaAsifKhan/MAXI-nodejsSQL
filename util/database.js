// const mysql = require('mysql2');
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'Zefi-1996'
// });



// module.exports = pool.promise();



// Simple SQL DATABSE

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'Zefi-1996',{
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
