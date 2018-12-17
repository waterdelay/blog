const express = require("express")

const router = express.Router()

const ctrl = require("../controller/use")

//监控http://127.0.0.1:50/register的get请求
router.get("/register", ctrl.getRegisterHandler)


//监控http://127.0.0.1:50/register的post请求
router.post("/register", ctrl.postRegisterHandler)

//注册成功  开始写登录页面
router.get("/login", ctrl.getLoginHandler)

//开始写登录逻辑
router.post("/login", ctrl.postLoginHandler)

//监控注销页面的路由
router.get("/logout",ctrl.getLogoutHandler)

module.exports = router