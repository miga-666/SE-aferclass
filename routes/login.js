var express = require('express');
var router = express.Router();

// checkLogin(): 到 DB 檢查是否有這位使用者
// fromdata: 前端傳來的登入資料
let checkLogin = (db, formdata) => {
  return new Promise((rs, rj) => {
    let sql = "SELECT * FROM user WHERE username=? AND password=?";
    let params = [formdata['username'], formdata['password']];
    db.query(sql, params,  (err, rows) => {
      if(err) {
        console.log("[SELECT ERROR -]", err);
        rj("DB ERROR");
      } else {
        if(rows.length == 0) {
          rj("NOT FOUND");
        } else {
          if(rows[0]['username'] == formdata['username'] 
          && rows[0]['password'] == formdata['password']) {
            rs(rows[0]);    // 回傳結果
          } else {
            rj("username or password wrong");
          }
        }
      }
    })
  })
}


router.post('/', async function (req, res, next) {
  // console.log(req.session);
  let formData = req.body;
  try {
    // 到 DB 檢查是否有這位使用者
    let userData = await checkLogin(req.db, formData);
    // 將使用者資料加到 session
    req.session.user = {
      uid:userData['id'],
      username:userData['username']
    }
    // console.log("uid is", req.session.user.uid);
    // console.log("username is", req.session.user.username);
    res.redirect('/');  //重新導回首頁
  } catch (error) {
    console.log(error);
    res.render('msg', {js: "alert('登入失敗, 重新導向登入頁面');location.href='/login'"});
    //res.send("登入失敗");
  }
});

module.exports = router;