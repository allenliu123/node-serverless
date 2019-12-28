'use strict'
var mysql = require('mysql')

var connect = function() {
  
  var connection = mysql.createConnection({
    host: 'ifthat.com',
    user: 'node_serverless',
    password: 'NodeServerless1997',
    database: 'node_serverless'
  })
  console.log('connected')
  return connection
}
module.exports = connect; 
