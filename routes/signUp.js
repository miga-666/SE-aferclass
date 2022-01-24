var express = require('express');
var router = express.Router();

// checkDuplicate(): 到 DB 檢查 username 是否重複
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

// writeDB(); 將註冊資料寫入 DB
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

/* 設定路由 */
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
});

module.exports = router;