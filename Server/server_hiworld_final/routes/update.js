var express=require('express'),
    Model=require('../models/model');//调用自定义的Mongoose Model

var router=express.Router();
var goodModel=Model.goodModel;

router.put('/favor',function(req,res,nexy){
    let gId=req.body.gId,
        fnum=req.body.fnum,
        _id=req.body._id;
        console.log('gid:',gId)
        console.log('fnum:',fnum)
        console.log('_id:',_id)
    goodModel.updateOne({"_id":gId},{$inc:{favor:fnum}},(err,docs)=>{
        if (!err) {
            let fstate="";
            if (fnum==1) fstate="收藏成功";
            else fstate="收藏取消";
            res.status(200).json({fstate:fstate});
        }
    })
})


module.exports=router;