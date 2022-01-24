function showdata(data) {
  console.log(data);
  let html = '';
  html += '<table class="text-center m-auto table">';
  //流水號, title, content, 加入日期, 完成時間, 是否已完成
  html += '<thead class="fs-5"><td>SD</td><td>Title</td><td>Content</td><td>Added Day</td><td>Added Time</td><td>Complete</td><thead>';
  for (let i = 0; i < data.length; i++) {
    // 依據事件是否已完成, 決定 'Complete' 的內容
    let html_done = "";
    if (data[i]['isDone'] == 1) {
      html_done = "<td>-</td>";
    } else {
      html_done = `<td id="grid_${data[i]['id']}"><button onclick="doneItem(${data[i]['id']})" id="${data[i]['id']}"
                    class="btn btn-success">Done</button></td>`;
    }
    html += `<tr>
             <td>${i + 1}</td>
             <td>${data[i]['title']}</td>
             <td>${data[i]['content']}</td>
             <td>${data[i]['date']}</td>
             <td>${data[i]['time']}</td>` +
      html_done +
      `</tr>`;
  }
  html += '</table>'
  document.getElementById("show").innerHTML = html;
}


/* AJAX */

var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3AC6Vv4h967D3dW_0-1GDiMGB9ifFArN6C.AV0wikUFJO91KEI65rrPxdZFDGNj%2BTIWz0XbkFAI3dU");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// 列出全部
function showALL() {
  console.log("showALL!");
  fetch("/get/all", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      showdata(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
}

//列出已完成
function showDone() {
  console.log("showDone!");
  fetch("/get/done", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      showdata(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
}

// 列出未完成
function showUndone() {
  console.log("showUnDone!");
  fetch("/get/undone", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      showdata(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
}

// function rmButton(id) {
//   let button = document.getElementById("grid_"+id);
//   console.log(button);
//   button.innerHTML
// }

// 完成工作
function doneItem(id) {
  console.log("doneItem!");
  console.log("request id: ", id);
  fetch(`/changeDB/done?id=${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      showUndone();
      // showdata(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
}

showUndone();

