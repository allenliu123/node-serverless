var express = require('express')
var app = express()

// // 连接数据库
// var connect = require('./utils/connect')
// var mysql = connect()

// var response = require('./utils/response')

// var dbs = require('./dbs/user')

var createTable = require('./utils/createTable')

// createTable()

// 解析post请求数据
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // 数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })) // 解析post请求数据

// routers
app.use('/ns', require('./routers/index'))

// app.use((req, res, next) => {
//   var url = req.originalUrl
//   lst = url.split('/')
//   var tableName = lst[1]
//   // if(urls[2]) {
//   //   var primaryKey = lst[2]
//   // }
//   switch(req.method) {
//     case 'GET': handleGet(tableName, res); break;
//     case 'POST': handlePost(tableName, res); break;
//   }
//   next()
// })

// function handleGet(tableName, res) {
//   console.log(tableName)
//   if(tableName in dbs) {
//     mysql.query(`select * from ${tableName}`, (err, results) => {
//       if(!err) {
//         res.json(response(200, null, results))
//       }
//     })
//   } else {
//     res.json(response(-1, `${tableName} 表不存在`, null))
//     res.end()
//   }
// }

app.listen('8080', console.log(`the server is running on 8080`))