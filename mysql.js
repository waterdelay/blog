const mysql=require("mysql")

//实现本地链接
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    //这是开启可以查询多条sql语句
    multipleStatements: true
})

//曝光
module.exports=conn