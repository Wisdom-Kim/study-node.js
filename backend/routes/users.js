const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { user } = require('../models');

const router = express.Router();

//회원가입 API
router.post('/join-user', isNotLoggedIn, async (req, res, next)=> {
    const { email, user_password, name, nickname, phone_number } = req.body;
    try {
        const exUser = await user.findOne({where: { email }});
        if (exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다');
            return res.redirect('/join');
        }
        await user.create({
            email,
            user_password,
            name,
            nickname,
            phone_number
        })
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
});

//로그인 API
router.post('/login-user', isNotLoggedIn, (req,res,next)=>{
    passport.authenticate('local', {session:false}, (authError, user, info)=>{
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('login-error', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
});

//로그아웃 API
router.get('/logout-user', isLoggedIn, (req,res)=>{
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

//회원탈퇴 API
router.delete(':id', isLoggedIn, (req, res)=> {
    user.destroy({
        where: {
            id: req.session.user.id,
        },
    }).then(()=> {
        req.session.destroy();
        res.status(200).send('탈퇴 처리되었습니다');
    }).catch((err)=>{
        console.error(err);
        res.status(500).send('err');
    })
});

module.exports = router;