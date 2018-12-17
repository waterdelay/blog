
//导入数据库
const conn = require("../mysql")
const moment = require("moment")
module.exports = {
    //监控http://127.0.0.1:50/register的get请求
    getRegisterHandler(req, res) {
        // console.log(req.query)
        res.render("user/register", {})
    },
    //监控http://127.0.0.1:50/register的post请求
    postRegisterHandler(req, res) {
        // console.log(req.body)
        let usersInfo = req.body
        // 1.表单校验
        if (!usersInfo.username.trim() || !usersInfo.password.trim() || !usersInfo.nickname.trim()) return res.status(400).send({ status: 400, msg: "请输入正确的格式" })

        // 2.查重
        const repeatSql = "select count(*) as count from users where username = ?"
        conn.query(repeatSql, usersInfo.username, (err, result) => {
            // console.log(err)
            if (err) return res.status(500).send({ status: 500, msg: "查重失败,请重试" })
            if (result[0].count !== 0) return res.status(400).send({ status: 400, msg: '用户名重复!请重试!' })
        })

        // 3.能到此处 说明可以注册
        // 添加ctime字段
        usersInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        //添加sql语句
        const registerSql = "insert into users set?"
        conn.query(registerSql, usersInfo, (err, result) => {
            if (err) return res.status(500).send({ status: 500, msg: "注册失败,请重试" })
            res.send({ status: 200, msg: "注册成功" })
        })
    },
    //注册成功  开始写登录页面
    getLoginHandler(req, res) {
        res.render("./user/login", {})
    },
    //开始写登录逻辑
    postLoginHandler(req, res) {
        //   console.log(req.body)
        const loginSql = "select * from users where username = ? and password = ?"
        conn.query(loginSql, [req.body.username, req.body.password], (err, result) => {
            //    console.log(result)
            if (err || result.length == 0) return res.status(400).send({ status: 400, msg: "用户名或密码错误,请重试!" })
            // 登录成功
            // 将用户信息存储在session中
            req.session.userInfo = result[0]
            // 记录登录状态
            req.session.isLogin = true
            // console.log(req.session)
            res.send({ status: 200, msg: '登录成功!' })
        

        })
    },

            //开始写注销登录
            getLogoutHandler(req, res) {
                req.session.destroy((err) => {
                    // cannot access session here
                    // 在这里不能访问session了  已经销毁完成了
                    // console.log(111)
                    res.send({ status: 200, msg: '退出登录成功!' })
                })
            }

}