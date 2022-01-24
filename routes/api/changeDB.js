/* 到 DB 修改資料 */

var express = require('express');
var router = express.Router();
var url = require('url');

// setDone(): 將未完成的工作設為已完成
let setDone = (db, id) => {
  // console.log("setDone id: ", id);
  return new Promise((rs, rj) => {
    let sql = `UPDATE item SET isDone='1' WHERE id=?`;
    let params = [id];
    db.query(sql, params, function (err, rows) {
      if (err) {
        console.log("[UPDATE ERROR] -", err);
        rj("DB ERROR");
      } else {
        if (rows.length == 0) {
          rj("THERE IS NO DATA");
        } else {
          rs(rows);
        }
      }
    });
  });
}

/* 設定路由 */
router.get('/done', async function (req, res, next) {
  try {
    //取得 url 傳來的 item id
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query['id'];
    await setDone(req.db, id);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
