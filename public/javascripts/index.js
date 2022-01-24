let previous = "undone";  //前次 show data 選項, 有 all, done, undone 三種, 預設 undone

// showdata(): 將回傳的資料印到 index.ejs
function showdata(data) {
  let html = '';
  html += '<table class="text-center m-auto table">';
  //流水號, title, content, 加入時間, 是否已完成
  html += '<thead class="fs-5"><td>SD</td><td>Title</td><td>Content</td><td>Added Time</td><td>Complete</td><thead>';
  for (let i = 0; i < data.length; i++) {
    // 先依據"事件是否已完成", 決定 "Complete" 欄位的內容
    let buttonHtml = "";
    // 已完成 -> 印 "-"
    if (data[i]['isDone'] == 1) {
      buttonHtml = "<td>-</td>";
    }
    // 未完成 -> 印 button
    else {
      // button 的 id 和 onclicked() 依據 item id 改變
      buttonHtml = `<td id="grid_${data[i]['id']}"><button onclick="doneItem(${data[i]['id']})"}"
                    class="btn btn-success">Done</button></td>`;
    }
    html += `<tr>
             <td>${i + 1}</td>
             <td>${data[i]['title']}</td>
             <td>${data[i]['content']}</td>
             <td>${data[i]['date']} ${data[i]['time']}</td>` +
      buttonHtml + `</tr>`;
  }
  html += '</table>'
  document.getElementById("show").innerHTML = html;
}

// showdata(): 如果沒有回傳資料, 印出一段話
// selected: show data 的選項
function showSentence(selected) {
  let html = "<p>";
  switch (selected) {
    case "all":
      html += "get something to do ?<br> Please fill in the form above.";
      console.log(1);
      break;
    case "done":
      html += "Here is a lazybone.";
      console.log(2);
      break;
    case "undone":
      html += "Having finished a job, <br> a hundred jobs waiting for being finished.";
      console.log(3);
      break
  }
  html += "</p>";
  document.getElementById('show').innerHTML = html;
}

// selectedButton(): 按下 button 後, button 外觀改變
function selectedButton(selected) {
  // 先前選擇的 button 變黑
  document.getElementById(previous).classList.remove("btn-outline-dark");
  document.getElementById(previous).classList.add("btn-dark");
  // 這次選擇的 button 變空心
  document.getElementById(selected).classList.remove("btn-dark");
  document.getElementById(selected).classList.add("btn-outline-dark");
  previous = selected;
}

/* AJAX */

// Request 可用的設定值
var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3AC6Vv4h967D3dW_0-1GDiMGB9ifFArN6C.AV0wikUFJO91KEI65rrPxdZFDGNj%2BTIWz0XbkFAI3dU");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// showALL(): 列出全部工作
function showALL() {
  selectedButton("all")
  // 到後端查詢
  fetch("/get/all", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result == "THERE IS NO DATA") {
        showSentence("all");
      } else {
        showdata(JSON.parse(result));
      }
    })
    .catch(error => console.log('error', error));
}

// showDone(): 列出已完成的工作
function showDone() {
  selectedButton("done");
  // 到後端查詢
  fetch("/get/done", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result == "THERE IS NO DATA") {
        showSentence("done");
      } else {
        showdata(JSON.parse(result));
      }
    })
    .catch(error => console.log('error', error));
}

// showUndone(): 列出未完成的工作
function showUndone() {
  selectedButton("undone");
  // 到後端查詢
  fetch("/get/undone", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result == "THERE IS NO DATA") {
        showSentence("undone");
      } else {
        showdata(JSON.parse(result));
      }
    })
    .catch(error => console.log('error', error));
}


// doneItem(): 完成工作
function doneItem(id) {
  // 到後端更新 DB
  fetch(`/changeDB/done?id=${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      showUndone();
    })
    .catch(error => console.log('error', error));
}

showUndone(); // 預設一進頁面顯示未完成的工作

