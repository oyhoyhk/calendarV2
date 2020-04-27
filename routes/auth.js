const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares.js');
const {
    User
} = require('../models');

const router = express.Router();

console.log('auth.js 안에서')
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    console.log('/auth/join 라우터 접근 성공');
    const {
        joinEmail,
        joinNick,
        joinPassword
    } = req.body;
    try {
        const exUser = await User.findOne({
            where: {
                email: joinEmail
            }
        });
        if (exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(joinPassword, 12);
        await User.create({
            email: joinEmail,
            nick: joinNick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.log('/auth/join 에서 발생한 error');
        console.error(error);
        return next(error);
    }
});
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, loginError => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
})

module.exports = router;