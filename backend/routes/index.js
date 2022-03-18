const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { post, user } = require('../models');
const router = express.Router();

var path = require('path');

router.get('/', (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public','index.html'))
});

module.exports = router;

//express의 라우터로 접근하면 public에 있는 index.html을 전달하도록 설정