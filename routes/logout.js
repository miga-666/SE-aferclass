var express = require('express');
var router = express.Router();

//清除 session
router.get('/', function(req, res, next) {
  req.session.user = undefined;
  res.redirect('/login');
});

module.exports = router;
