const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { post, user } = require('../models');

const router = express.Router();

router.get('/', (req,res,next)=>{
    res.end('sucess');
});