const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { user } = require('../models');

module.exports = () => {
    passport.use(new localStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'user_password',
    },
    async (req, email, user_password, done) => {
        try {
            const exUser = await user.findOne({where:{email}});
            if (exUser) {
                //const result = await user.findOne({where:{user_password}})
                const result = await bcrypt.compare(user_password, exUser.user_password);
                if (result){
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호 불일치'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다'});
            }
        } catch (err){
            console.error(err);
            done(err); 
        }
    }
    ));
};