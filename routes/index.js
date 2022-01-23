var express = require('express');
var router = express.Router();


let loginCheck = require('./middleware/loginCheck');

/* GET home page. */
router.get('/', loginCheck, function(req, res, next) {
  console.log((req.session));
  req.db.query('SELECT * FROM user WHERE id = 1', function(err, rows, fields) {  //query(指令, function)
    if (err) console.log(err);
    res.render('index', {title: 'Express', username: rows[0].username });
  });
});


router.get('/signUp', function(req, res, next) {
  res.render('signUp', {title:"express"});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:"express"});
});

router.get('/add', function(req, res, next) {
  res.render('add', {title:"express"});
});



module.exports = router;
