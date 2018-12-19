const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article')

//监控点击文章到article/add的get请求
router.get('/article/add', ctrl.getArticleAddHandler)

//监控点击文章编辑保存到article/add的post提交的表单请求
router.post("/article/add",ctrl.postArticleAddHandler)

//监控点击文章到article/add的post请求成功后跳转到article/info的详情页的get请求\
router.get("/article/info/:id",ctrl.getArticleInfoHandler)
module.exports = router