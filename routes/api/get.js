var express = require('express');
var router = express.Router();

let selectFutureItems = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT title, date, time, ps FROM item WHERE uid=? AND date >= CURDATE()';
    let params = [uid];
    db.query(sql, params, function(err, rows) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj("DB ERROR");
      } else {
        if(rows.length == 0) {
          rj("THERE IS NO DATA");
        } else {
          rs(rows);
        }
      }
    });
  });
}


router.get('/future', async function(req, res, next) {
  // console.log('有ㄟㄟ');
  // res.send('送你資料');
  try {
    let data = await selectFutureItems(req.db, req.session.user.uid);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;