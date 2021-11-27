//路徑url
//通常是資料夾路徑

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express軟工課輔' });
});

module.exports = router;
