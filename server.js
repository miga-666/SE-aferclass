var http = require('http'); // 1 - 載入 Node.js 原生模組 http
// import 模組
// http: 通訊協定、監聽server
// 全部用物件處理
 
var server = http.createServer(function (req, res) {   // 2 - 建立server
 
    // 在此處理 客戶端向 http server 發送過來的 req。
    console.log(123)
    console.log(req)
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><body>This is admin Page.</body></html>');
    res.end();
 
});
 
server.listen(5000); //3 - 進入此網站的監聽 port, 就是 localhost:xxxx 的 xxxx
//listen聽哪個port
 
console.log('Node.js web server at port 5000 is running..')