# node-serverless
node实现serverless

user table
|id|username|gender|age
|1|allen|female|18

get /user 表示查询user表的所有数据
get /user/:id 表示查询一条数据
post /user {
  username: username
}