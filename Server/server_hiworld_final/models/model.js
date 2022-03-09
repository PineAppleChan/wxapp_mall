var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/goods', { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.connection.once('open',() => {
    console.log('connceted to database.')
  });
var Model = {};
//商品信息表
var goodSchema = new mongoose.Schema({
    uId: { type: String, required: true, },
    uName: String,
    uAva: String,
    uPlace: Number,
    uCollege: Number,
    sId: Number,
    title: String,
    describe: String,
    price: Number,
    oriPrice: Number,
    imgList: Array,
    createAt: { type: Date, default: Date.now },
    favor: {type:Number,default:0}
}, { versionKey: false });
Model.goodModel = mongoose.model('goodModel', goodSchema);    //goodModel即collection名,在mongdb中会生成

//用户信息表
var userSchema = new mongoose.Schema({
    uId: { type: String, require: true },
    stuId: String,
    uName: String,
    uAva: String,
    uPlace: Number,
    uCollege: Number,
}, { versionKey: false });
Model.userModel = mongoose.model('userModel', userSchema);

//商品评论表
var commentSchema = new mongoose.Schema({
    gId: { type: mongoose.Schema.ObjectId, ref: 'goodModel' },
    uId: String,
    uAva: String,
    uName: String,
    cuId: String,
    cuName: String,
    cmt: String,
    createAt: { type: Date, default: Date.now }
}, { versionKey: false });
Model.commentModel = mongoose.model('commentModel', commentSchema);

//私信表
var messageSchema = new mongoose.Schema({
    uId: String,
    uAva: String,
    uName: String,
    muId: String,
    msg: String,
    muAva: String,
    gImage:String,
    createAt: { type: Date, default: Date.now }
}, { versionKey: false });
Model.messageModel = mongoose.model('messageModel', messageSchema);

module.exports = Model;
// console.log(Model)