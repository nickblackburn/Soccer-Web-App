var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit      : 10,
  host                 : 'host',
  user                 : 'user',
  password             : 'pw',
  database             : 'db',
  multipleStatements   : true
});

module.exports.pool = pool;
