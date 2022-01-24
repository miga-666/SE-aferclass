/* 擋下沒有登入的人, 藉由 url 進入網頁 */
// 有 session => 有登入

let loginCheck = (req, res, next) => {
  if(req.session.user == undefined) {
     res.redirect('/login');
  } else {
    next();
  }
}

module.exports = loginCheck;