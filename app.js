const express =require ("express")

const cors =require("cors")

const bodyParser =require("body-parser")
const app =express()

//导入数据库
const conn=require("./mysql.js")

// 开启CORS
app.use(cors())

// 注册了一个中间件, 用于解析用户提交的表单数据
app.use(bodyParser.urlencoded({ extended: false }))

//开启静态托管
app.use('/node_modules', express.static('./node_modules'))


// app.use("./views",express.static("./views`"))

//调用模板
app.set('view engine',"ejs")

// 设置模板存放路径  如果不设置 默认就在views目录
// app.set('views', './views')

app.get("/",(req,res)=>{
    res.render("index",{})
})
//监控http://127.0.0.1:50/register的get请求
app.get("/register",(req,res)=>{
    // console.log(req.query)
    res.render("user/register",{})
})
//监控http://127.0.0.1:50/register的post请求
app.post("/register",(req,res)=>{
    console.log(req.body)
    let usersInfo=req.body
    // 1.表单校验
    if(!usersInfo.username.trim()||!usersInfo.password.trim()||!usersInfo.nickname.trim()) return res.status(400).send({status:400,msg:"请输入正确的格式"})

    // 2.查重
    const repeatSql="select count(*) as count from users where username = ?"
    conn.query(repeatSql,usersInfo.username,(err,result)=>{
        // console.log(err)
        if(err) return res.status(500).send({status:500,msg:"查重失败,请重试"})
        if(result[0].count !==0) return res.status(400).send({ status: 400, msg: '用户名重复!请重试!' })
    })
    
    // 3.能到此处 说明可以注册
    // 添加ctime字段
    usersInfo.ctime= moment().format('YYYY-MM-DD HH:mm:ss')
})

app.listen(50,"127.0.0.1",()=>{
    console.log("server running at http://127.0.0.1:50")
})