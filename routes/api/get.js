var express = require('express');
var router = express.Router();

let selectALL = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT id, title, date, time, content, isDone FROM item WHERE 1';
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

let selectDone = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT id, title, date, time, content, isDone FROM item WHERE isDone=1';
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

let selectUndone = (db, uid) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT id, title, date, time, content, isDone FROM item WHERE isDone=0';
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
    // console.log("get id: ", id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;