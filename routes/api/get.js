/* 到 DB 取得資料 */

var express = require('express');
var router = express.Router();

// selectALL(): 取得全部工作資料
let selectALL = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = `SELECT id, title, date, time, content, isDone FROM item WHERE 1 and uid=${uid}`;
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

// selectALL(): 取得已完成的工作資料
let selectDone = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = `SELECT id, title, date, time, content, isDone FROM item WHERE isDone=1 and uid=${uid}`;
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

// selectALL(): 取得未完成的工作資料
let selectUndone = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = `SELECT id, title, date, time, content, isDone FROM item WHERE isDone=0 and uid=${uid}`;
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

/* 設定路由 */
router.get('/all', async function(req, res, next) {
  try {
    let data = await selectALL(req.db, req.session.user.uid);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/done', async function(req, res, next) {
  try {
    let data = await selectDone(req.db, req.session.user.uid);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/undone', async function(req, res, next) {
  try {
    let data = await selectUndone(req.db, req.session.user.uid);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;