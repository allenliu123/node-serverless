var tables = require('../db/tables')

// 连接数据库
var connect = require('../utils/connect')
var mysql = connect()

var createTable = function() {
  for(var i in tables) {
    let tableName = i
    var lst = []
    for(var j in tables[tableName]) {
      var str = ''
      str = '`' + j + '`' + ' ' + tables[tableName][j]
      lst.push(str)
    }
    var args = lst.join(', ')
    mysql.query(`DROP TABLE IF EXISTS ${tableName}`)
    var sql = `create table \`${tableName}\` (${args}) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    console.log(sql)
    mysql.query(sql, (err, results) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`create table ${tableName} success`)
      }
    })
  }
}

module.exports = createTable