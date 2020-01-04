const student = {
  s_id: 'varchar(255)',
  s_name: 'varchar(255)',
  gender: 'varchar(255)'
}

const course = {
  c_id: 'int',
  c_name: 'varchar(255)'
}

const choose = {
  id: 'int',
  s_id: 'varchar(255)',
  c_id: 'int'
}

module.exports = {
  student: student,
  course: course,
  choose: choose
}