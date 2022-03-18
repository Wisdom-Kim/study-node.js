const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { post, user } = require('../models');
const path = require('path');

const router = express.Router();

router.get('/', (req,res,next)=>{
    return res.sendFile(path.join(__dirname, '../public','index.html'));
});

module.exports = router;