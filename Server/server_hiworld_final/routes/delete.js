var express=require('express'),
    Model=require('../models/model');//调用自定义的Mongoose Model

var router=express.Router();
var goodModel=Model.goodModel;

router.get('/delete', function (req, res) {
    let _id = req.query._id;
    goodModel.deleteOne({ '_id': _id }, function (err, docs) {
        if(err)
        {
            console.log(err)
        }
        res.json(docs);
    });
});

module.exports=router;