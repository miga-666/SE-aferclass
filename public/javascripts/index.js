function showdata(data) {
  let html = '';
  for(let i = 0; i< data.length; i++) {
    for (const key in data[i]) {
      html += `${key} : ${data[i][key]}<br>`;
    }
    html += '<hr>';
  }
  document.getElementById("show").innerHTML = html;
}

var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3AC6Vv4h967D3dW_0-1GDiMGB9ifFArN6C.AV0wikUFJO91KEI65rrPxdZFDGNj%2BTIWz0XbkFAI3dU");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/get/future", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    showdata(JSON.parse(result));
  })
    
  .catch(error => console.log('error', error));