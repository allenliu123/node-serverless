var express = require('express')
var router = express.Router()

// 连接数据库
var connect = require('../utils/connect')
var mysql = connect()

router.get('/', (req, res) => {
  res.send('success')
})

module.exports = router