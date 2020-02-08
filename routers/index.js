var express = require('express')
var router = express.Router()

// 连接数据库
var connect = require('../utils/connect')
var mysql = connect()

// 数据库建表语句
var tables = require('../db/tables')
var response = require('../utils/response')

router.get('/', (req, res) => {
  res.send('success')
})

router.get(/.*/, (req, res) => {
  let tableName = req.url.split('/')[1].split('?')[0]
  console.log('tableName: ' + tableName)
  if(!checkTables(tableName)) {
    res.json(response(-1, `${tableName} 表不存在`, null))
    return
  }
  let checkParamsRes = checkParams(tableName, req.query)
  if(checkParamsRes.state === false) {
    res.json(response(-1, `${tableName} 表中不存在 ${checkParamsRes.errQuery} 属性`, null))
    return
  }
  let sql = generateSql(tableName, req.query)
  mysql.query(sql, (err, results) => {
    if(!err) {
      res.json(response(200, null, results))
    }
  })
})

function checkTables(tableName) {
  return tableName in tables
}

function checkParams(tableName, query) {
  var obj = { state:  true }
  for(var param in query) {
    if(param in tables[tableName]) {
      obj.state = true
    } else {
      obj.state = false
      obj.errQuery = param
      break
    }
  }
  return obj
}

function generateSql(tableName, params) {
  if(JSON.stringify(params) == '{}') {
    return `select * from ${tableName}`
  }
  let lst = []
  for(var param in params) {
    lst.push(`${param}='${params[param]}'`)
  }
  
  let sql = `select * from ${tableName} where ${lst.join(' and ')}`
  console.log(sql)
  return sql
}

// router.all(/.*/, function(req, res) {
//   var url = req.originalUrl
//   urls = url.split('/')
//   console.log(urls)
//   var tableName = urls[1]
//   if(urls[2]) {
//     var primaryKey = urls[2]
//   }
//   res.json({req: 'req'});
// });

module.exports = router