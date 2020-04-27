const express = require("express");
const { isLoggedIn, isNotLoggedIn }  = require('./middlewares');

const router = express.Router();

router.get('./profile', isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render('profile', { title: ' Calendar - '})
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: 'Calendar - 회원가입',
    user:req.user,
    joinError:req.flash('joinError'),
  })
})

router.get('/', (req, res, next) => {
  res.render('main', {
    title:'Calendar',
    user:req.user,
    loginError:req.flash('loginError'),
  })
})

module.exports = router;
