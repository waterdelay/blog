const express = require("express")

const cors = require("cors")

const bodyParser = require("body-parser")

const fs = require("fs")

const path = require("path")

//引用session
const session=require("express-session")

const app = express()

//注册session的中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // 如果不设置过期时间  默认 关闭浏览器即过期, 无法存储有效的cookie
}))

// 开启CORS  解决跨越的问题
app.use(cors())

// 注册了一个中间件, 用于解析用户提交的表单数据
app.use(bodyParser.urlencoded({ extended: false }))

//开启静态托管
app.use('/node_modules', express.static('./node_modules'))


// app.use("./views",express.static("./views`"))

//调用模板
app.set('view engine', "ejs")

// 设置模板存放路径  如果不设置 默认就在views目录
// app.set('views', './views')

// 注册路由  分发路由后一点要用中间件注册路由
// const indexRouter = require('./routes/index')
// app.use(indexRouter)

// app.use(require('./routes/index'))
// app.use(require('./routes/user'))

// 使用fs模块读取routes目录下所有的文件名
fs.readdir("./routers", (err, files) => {
    // console.log(files)
    if (err) return console.log(err.message)

    files.forEach(file => {
        // console.log(file)
        // 相对路径引入
        // console.log('./routes/' + filename)
        // app.use(require('./routes/' + filename))

        // 绝对路径引入
        // let 和 const 都有块级作用域
        const filePath = (path.join(__dirname, "./routers/" + file))
        // console.log(filePath)
        app.use(require(filePath))
    })

})


app.listen(50, "127.0.0.1", () => {
    console.log("server running at http://127.0.0.1:50")
})