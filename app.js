var express = require('express')
var app = express()

// 解析post请求数据
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // 数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })) // 解析post请求数据

// routers
app.use('/', require('./routers/index'))

app.listen('8080', console.log(`the server is running on 8080`))