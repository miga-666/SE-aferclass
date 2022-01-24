var express = require('express');
var router = express.Router();
var url = require('url');
const { get } = require('express/lib/response');

let setDone = (db, id) => {
  console.log("setDone id: ", id);
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

router.get('/done', async function (req, res, next) {
  try {
    //取得 url 傳來的 item id
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query['id'];
    console.log("router get id: ", id);
    await setDone(req.db, id);
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
