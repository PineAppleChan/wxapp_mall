var express = require('express'),
    queryRouter = require('./routes/query'),
    insertRouter = require('./routes/insert'),
    delRouter = require('./routes/delete'),
    updateRouter = require('./routes/update'),
    loginRouter=require("./routes/login"),
    uptokenRouter=require("./routes/uptoken"),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override');

var app = express();

app.all('*', function (req, res, next) {
    //允许的来源
    res.header("Access-Control-Allow-Origin", "*");
    //允许的头部信息，如果自定义请求头，需要添加以下信息，允许列表可以根据需求添加
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    //允许的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.send("HELLO WORLD")
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.listen(3000,function(){
    console.log("server is listening in 3000");
});


//查询路由
app.use('/', queryRouter);
//插入路由
app.use('/', insertRouter);
//删除路由
app.use('/', delRouter);
//更新路由
app.use('/', updateRouter);
//用户登录授权
app.use('/',loginRouter);
//七牛图片上传凭证
app.use('/',uptokenRouter);

