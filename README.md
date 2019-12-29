# node-serverless
node实现serverless

TABLE user
| id  | username | gender |
| --- | --- | --- |
| 1  | allen  | male |
| 2  | jack  | male |


get /user 表示查询user表的所有数据

get /user/:id 表示查询一条数据

post /user {
  username: username
}
