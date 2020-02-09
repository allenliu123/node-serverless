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
  let sql = generateSelectSql(tableName, req.query)
  mysql.query(sql, (err, results) => {
    if(!err) {
      res.json(response(200, null, results))
    }
  })
})

router.post(/.*/, (req, res) => {
  let tableName = req.url.split('/')[1].split('?')[0]
  console.log('tableName: ' + tableName)
  if(!checkTables(tableName)) {
    res.json(response(-1, `${tableName} 表不存在`, null))
    return
  }
  if(JSON.stringify(req.body) == '{}') {
    res.json(response(-1, `未提供任何参数`, null))
    return
  }
  let checkParamsRes = checkParams(tableName, req.body)
  if(checkParamsRes.state === false) {
    res.json(response(-1, `${tableName} 表中不存在 ${checkParamsRes.errQuery} 属性`, null))
    return
  }
  let sql = generateInsertSql(tableName, req.body)
  mysql.query(sql, (err, results) => {
    if(!err) {
      res.json(response(200, null, results))
    }
  })
})

router.put(/.*/, (req, res) => {
  let tableName = req.url.split('/')[1].split('?')[0]
  console.log('tableName: ' + tableName)
  if(!checkTables(tableName)) {
    res.json(response(-1, `${tableName} 表不存在`, null))
    return
  }
  if(JSON.stringify(req.body) == '{}') {
    res.json(response(-1, `未提供任何参数`, null))
    return
  }
  let sql = generatePutSql(tableName, req.query, req.body)
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

function generateSelectSql(tableName, params) {
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

function generateInsertSql(tableName, params) {
  let [keys, values] = [[],[]]
  for(var param in params) {
    keys.push(param)
    values.push(`'${params[param]}'`)
  }
  let sql =  `insert into ${tableName} (${keys.join(', ')}) values (${values.join(', ')})`
  console.log(sql)
  return sql
}

function generatePutSql(tableName, paramsQuery, paramsBody) {
  if(JSON.stringify(paramsQuery) == '{}') {
    // 创建记录
    return generateInsertSql(tableName, paramsBody)
  } else {
    // 更新记录
    let lst = []
    for(let param in paramsBody) {
      lst.push(`${param}='${paramsBody[param]}'`)
    }
    let lst1 = []
    for(let param in paramsQuery) {
      lst1.push(`${param}='${paramsQuery[param]}'`)
    }
    let sql = `update ${tableName} set ${lst.join(', ')} where ${lst1.join(' and ')}`
  console.log(sql)
  return sql
  }
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