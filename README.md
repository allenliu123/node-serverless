# node-serverless
node实现serverless

TABLE student
| s_id | s_name | gender |
| --- | --- | --- |
| 1001 | 小明 | 男 |
| 1002 | 小红 | 女 |

TABLE course
| c_id | c_name |
| --- | --- |
| 1 | 计算机基础 |
| 2 | 数据库原理 |

TABLE choose
| id | s_id | c_id |
| --- | --- | --- |
| 1 | 1001 | 1 |
| 2 | 1002 | 2 |


[x] get /user 表示查询 student 表的所有数据
(select * from `user`)

[x] get /user?s_id=123 表示查询一条数据
(select * from user where id = ${id})

[x] post /user 表示添加一条数据
data: {
  sId: 1001,
  sName: '123',
  gender: '男'
}
(insert into `user` (`s_id`, `s_name`, `gender`) values (${data.sId}, ${data.sName}, ${data.gender}))

[x] put /user
data: {
  sId: 1001,
  sName: '123',
  gender: '男'
}
(update `user` set `s_id`=${data.sId}, `s_name`=${data.sName}, `gender`=${data.gender})

[x] delete /user/:id
(delete from `user` where `s_id`=${id})
