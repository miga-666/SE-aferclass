var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

//檢查名字是否重複
let checkDuplicate = (db, formdata) => {
  return new Promise((rs, rj) => {
    let sql = "SELECT username FROM user WHERE 1";
    db.query(sql, (err, rows) => {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj(400);
      } else {
        //檢查資料庫中是否已有重複的使用者
        //formdata 的 username 是否已在迴圈裡
        if(rows.length == 0) {
          rs(200);
        } else {
          console.log(rows);
          rows.forEach(element => {
            if(element['username'] == formdata['username']) {
              rj(400);
            }
          });
          rs(200);
        }
      }
    })
  })
}

let writeDB = (db, formdata) => {
  return new Promise((rs, rj) => {
    let sql = "INSERT INTO `user`(`username`, `password`) VALUES (?, ?)";
    let params = [formdata['username'], formdata['password']];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("[INSERT ERROR] -", err);
        rj(400);
      } else {
        rs(200);
      }
    })
  })
}







router.post('/', async function (req, res, next) {
  let formdata = req.body;
  console.log(formdata);
  try {
    await checkDuplicate(req.db, formdata);
    console.log("checkDuplicate OK!!!!");
    await writeDB(req.db, formdata);
    console.log("writeDB OK!!!!");
    // res.send('OK')
    res.redirect('/');
  } catch (error){
    console.log(error);
    res.redirect('/');
    // res.send('註冊失敗')
  }
  //res.send('ok');
});

module.exports = router;