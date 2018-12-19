const conn = require("../mysql")

const moment = require("../node_modules/moment")
const marked = require('marked')
const mditor = require('mditor')

const parser = new mditor.Parser()

module.exports = {
  getArticleAddHandler(req, res) {
    // 未登录用户的拦截操作
    if (!req.session.isLogin) return res.redirect('/')

    res.render('article/add', {
      isLogin: req.session.isLogin,
      userInfo: req.session.userInfo
    })
  },
  postArticleAddHandler(req, res) {

    // 没有登录或者身份信息已经失效
    if (!req.session.isLogin) return res.status(401).send({ status: 401, msg: "身份信息已过期!请登陆后重试!!" })
    // console.log(req.body)
    // req.body 是引用数据类型  对象
    // 将req.body的地址值赋值给articleInfo变量
    // req.body和articleInfo同时指向同一个对象
    // 往articleInfo上添加ctime属性等于给req.body上添加ctime属性r
    const articleInfo = req.body
    articleInfo.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
    //这里需要记录文章的作者id   好为后面的作为连表查询的依据
    articleInfo.author_id = req.session.userInfo.id
    // console.log(articleInfo)
    const addArticleSql = "insert into article set ?"
    conn.query(addArticleSql, articleInfo, (err, result) => {
      // console.log(result)
      if (err || result.affectedRows != 1) return res.status(500).send({ status: 500, msg: "文章提交失败,请重试" })
      res.send({ status: 200, msg: "文章提交成功", articleId: result.insertId })
      // console.log(result)
    })
  },
  getArticleInfoHandler(req, res) {
    // console.log(req.params)
    const articleId = parseInt(req.params.id)
    const infoSql = "select * from article where id =?"
    conn.query(infoSql, articleId, (err, result) => {
      if (err || result.length != 1) return res.redirect('/')
      // console.log(err)
      // render和send的是使用时机
      // 当用户使用get请求访问服务器并且需要看到页面时 应该用render渲染
      // 当用户使用ajax请求访问服务器 并且需要获取数据时  应该用send返回数据
      // res.send(result) 
      // result[0].content = marked(result[0].content)
      result[0].content = parser.parse(result[0].content)
      res.render("article/info", {
        isLogin: req.session.isLogin,
        userInfo: req.session.userInfo,
        articleInfo: result[0]
      })
      console.log(result)
    })
  }
}