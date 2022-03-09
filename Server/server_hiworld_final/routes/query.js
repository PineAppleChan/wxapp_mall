var express = require('express'),
    mongoose = require('mongoose'),
    {getDateDiff} = require('../utils/utils'),
    config = require('../config'),//引入配置文件
    wechat  = require('../wechat/wechat'), 
    Model = require('../models/model');//调用自定义的Mongoose Model
var multipart = require('connect-multiparty');
var fs = require('fs'); //引入 fs 模块


var wechatApp = new wechat(config); //实例wechat 模块
var router = express.Router();
var goodModel = Model.goodModel,
    commentModel = Model.commentModel;
    messageModel = Model.messageModel;

var pageNum = 20;

//msgSecCheck
router.get('/msgSecCheck', function (req, res) {
    var msg = req.query.msg;
    wechatApp.msgSecCheck(msg).then(function(data){
        res.json(data);
    });
});
//imgSecCheck
router.post('/imgSecCheck', multipart(), function (req, res) {
    const { files } = req;
    const stream = fs.createReadStream(files.file.path);
    
    wechatApp.imgSecCheck(stream).then(function(data){
        res.json(data);
    });
});

//获取getAccessToken
router.get('/getAccessToken', function (req, res) {
    wechatApp.getAccessToken().then(function(data){
        res.json(data);
    });
});

//首页商品列表
router.get('/goods', function (req, res) {
    var scrollPage = req.query.page;
    
    goodModel.find({}, function (err, docs) {
        for (var item in docs) {
            let time = getDateDiff(docs[item]["createAt"]);
            docs[item]["createAt"] = time;
        }
        res.json(docs);
    }).limit(pageNum).skip(scrollPage * pageNum).sort({ '_id': -1 }).lean();
});

//分类商品列表
router.get('/sections', function (req, res) {
    var sId = req.query.id;
    var scrollPage = req.query.page;
    goodModel.find({ 'sId': sId }, function (err, docs) {
        for (var item in docs) {
            let time = getDateDiff(docs[item]["createAt"]);
            docs[item]["createAt"] = time;
        }
        res.json(docs);
    }).limit(pageNum).skip(scrollPage * pageNum).sort({ '_id': -1 }).lean();
});

//商品信息和评论单页
router.get('/good', function (req, res) {
    var _id = mongoose.Types.ObjectId(req.query._id);
    // console.log(_id)
    goodModel.aggregate([
        { $lookup: { from: "commentmodels", localField: "_id", foreignField: "gId", as: "cmt" } },
        { $match: { "_id": _id } }
    ], function (err, docs) {
        let gData = docs[0];
        let cmtData = [];
        if ("cmt" in gData) {
            cmtData = gData["cmt"];
            delete gData["cmt"];
            for (var item in cmtData) {
                let time = getDateDiff(cmtData[item]["createAt"]);
                cmtData[item]["createAt"] = time;
            }
        }
        res.json({ gData: gData, cmtData: cmtData });
    });
});

//刷新评论
router.get('/comment', function (req, res) {
    let gId = req.query.gId;
    commentModel.find({ 'gId': gId }, function (err, docs) {
        for (var item in docs) {
            let time = getDateDiff(docs[item]["createAt"]);
            docs[item]["createAt"] = time;
        }
        res.json(docs);
    }).sort({ 'createAt': 1 }).lean();
})

//刷新私信
router.get('/message', function (req, res) {
    let muAva = req.query.muAva;
    messageModel.find({ 'muAva': muAva }, function (err, docs) {
        for (var item in docs) {
            let time = getDateDiff(docs[item]["createAt"]);
            docs[item]["createAt"] = time;
        }
        res.json(docs);
    }).sort({ 'createAt': 1 }).lean();
})

module.exports = router;