var express = require('express');
var router = express.Router();

let insertItem = (db, uid, formdata) => {
  return new Promise((rs, rj) => {
    let sql = 'INSERT INTO `item`(`uid`, `title`, `date`, `time`, `content`) VALUES (?,?,?,?,?)';
    let params = [uid, formdata['title'], formdata['date'], formdata['time'], formdata['content']];
    db.query(sql, params, (err, result) => {
      if(err){
        console.log("[INSERT ERROR] -", err);
        rj('DB ERROR');
      } else {
        console.log(result);
        rs('OK');
      }
    })
  })
}


router.post('/', async function(req, res, next) {
  let formdata = req.body;
  console.log(formdata);
  //把新增的事項從進資料庫
  try {
    await insertItem(req.db, req.session.user.uid, formdata);
    res.send('OK');
  } catch (error) {
    console.log(error);
    res.send('BAD');
  }
});

module.exports = router;
