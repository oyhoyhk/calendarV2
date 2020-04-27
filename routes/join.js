const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('join', {
        title: "Calendar - 회원가입",
        loginError: req.flash('loginError')
    })
});


module.exports = router;