var express = require('express');
var router = express.Router();


let loginCheck = require('./middleware/loginCheck');


//insertItem(): 將新事項加入資料庫
let insertItem = (db, uid, formdata) => {
  return new Promise((rs, rj) => {
    let sql = 'INSERT INTO `item`(`uid`, `title`, `date`, `time`, `content`) VALUES (?,?,CURDATE(), CURTIME(),?)';
    let params = [uid, formdata['title'], formdata['content']];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("[INSERT ERROR] -", err);
        rj('DB ERROR');
      } else {
        console.log(result);
        rs('OK');
      }
    })
  })
}

//接收前端 post 來的資料
router.post('/', async function (req, res, next) {
  let formdata = req.body;
  console.log("formdata: ", formdata);
  //把新增的事項從進資料庫
  try {
    await insertItem(req.db, req.session.user.uid, formdata);
    console.log('OK');
    // res.send('OK');
    res.redirect('/');
  } catch (error) {
    console.log(error);
    // res.send('BAD');
    res.redirect('/');
  }
});



/* GET home page. */
router.get('/', loginCheck, function (req, res, next) {
  console.log(req.session);
  req.db.query('SELECT * FROM user WHERE id = 1', function (err, rows, fields) {  //query(指令, function)
    if (err) console.log(err);
    res.render('index', { title: 'Express', username: rows[0].username });
  });
});



router.get('/signUp', function (req, res, next) {
  res.render('signUp', { title: "express" });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: "express" });
});



module.exports = router;
