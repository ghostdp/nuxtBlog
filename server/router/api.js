var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var UserModel = require('../model/users.js');
var BannerModel = require('../model/banners.js');
var ClassifyModel = require('../model/classifys.js');
var router = express.Router();

var upload = multer({ dest: 'static/uploads/' });

router.get('/register', function(req, res, next) {
	let username = req.query.username;
	let password = req.query.password;
	let password2 = req.query.password2;
	//console.log( username , password , password2 );
	
	UserModel.findOne({ username }).then((info)=>{
		if(info){    //用户已存在
			res.send({ code : -1 });
		}
		else{   //用户不存在
			UserModel({
				username,
				password,
			}).save().then((info)=>{
				res.send({ code : 0 });
			});
		}
	});

});

router.get('/login', function(req,res,next){
	let username = req.query.username;
	let password = req.query.password;

	UserModel.findOne({
		username,
		password,
	}).then((info)=>{
		if(info){
			var token = parseInt(Math.random() * 99999);
			
			delete req.session.token;
			delete req.session.username;

			req.session.token = token;
			req.session.username = username;
			
			res.send({ code : 0 , token , username });
		}
		else{
			res.send({ code : -1 });
		}
	});

});

router.get('/isLogin' , function(req,res,next){
	var token = req.query.token;
	console.log( token , req.session.token );
	if( token && token == req.session.token ){
		res.send({ code : 0 , username : req.session.username });
	}
	else{
		res.send({ code : -1 });
	}
});

router.get('/logout',function(req,res,next){
	req.session.destroy();
	res.send({ code : 0 });
});

router.post('/upload', upload.single('file') ,(req,res)=>{
	//console.log(111, req.file );
	fs.rename('static/uploads/' + req.file.filename , 'static/uploads/'+ req.session.username +'.jpg',()=>{
		res.send({ code : 0 });
	});
});

router.get('/banner',(req,res)=>{
	
	var title = req.query.title;
	var username = req.session.username;

	BannerModel.findOne({ username }).then((info)=>{
		if( info ){
			BannerModel.updateOne({ username } , { $set : { title } }).then((info)=>{
				res.send({ "code" : 0 });
			});
		}
		else{
			BannerModel({
				username,
				title
			}).save().then((info)=>{
				res.send({ code : 0 });
			});
		}
	});

});

router.get('/getBanner',(req,res)=>{
	var username = req.query.id;
	BannerModel.findOne({ username }).then((info)=>{
		if( info ){
			res.send({ code : 0 , title : info.title });
		}
		else{
			res.send({ code : -1 });
		}
	});
});

router.get('/addClassify',(req,res)=>{
	var content = req.query.content;
	var username = req.session.username;

	ClassifyModel.findOne({
		username
	}).then((info)=>{
		if(info){
			ClassifyModel.updateOne({ username , "contents" : {$ne: { content , state : false } } } , { $push : { contents : { content , state : false } } }).then((info)=>{
				res.send({ "code" : 0 });
			});
		}
		else{
			ClassifyModel({
				contents : [ { content , state : false } ],
				username
			}).save().then((info)=>{
				if(info){
					res.send({ code : 0 });
				}
				else{
					res.send({ code : -1 });
				}
			});
		}
	});		

	
});

router.get('/deleteClassify',(req,res)=>{

});

router.get('/editClassify',(req,res)=>{

});

router.get('/listClassify',(req,res)=>{
	var username = req.query.username;
	ClassifyModel.findOne({
		username
	}).then((info)=>{
		if(info){
			res.send({ code : 0 , contents : info.contents });
		}
		else{
			res.send({ code : -1 });
		}
	});		
});


module.exports = router;