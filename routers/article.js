const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article')

//监控点击文章到article/add的get请求
router.get('/article/add', ctrl.getArticleAddHandler)

//监控点击文章编辑保存到article/add的post提交的表单请求
router.post("/article/add",ctrl.postArticleAddHandler)

//监控点击文章到article/add的post请求成功后跳转到article/info的详情页的get请求\
router.get("/article/info/:id",ctrl.getArticleInfoHandler)

//监听文章发布列表页的编辑get请求
router.get("/article/edit/:id",ctrl.getArticleEditHandler)

//监听文章详情页的编辑提交保存post请求
router.post("/article/edit/:id",ctrl.postArticleEditHandler)
module.exports = router