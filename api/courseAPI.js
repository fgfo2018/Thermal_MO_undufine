const express = require('express');
const app = express();
// const SocketServer = require('ws').Server
// const PORT = 6780 //指定 port
const fs = require('fs');

// const server = express().listen(PORT, () => {
//   console.log(`Listening on ${PORT}`)
// })

// ======== server 1 ========
//將 express 交給 SocketServer 開啟 WebSocket 的服務
// const wss1 = new SocketServer({
//   server,
//   path: "/server1"
// })

// wss1.on('connection', ws => {
//   console.log('Client connected')
// //   // 當收到client消息時
//   ws.on('message', (data, type) => {
// //     //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
//     ws.send(data.toString())
//     console.log(data.toString())
//   })
//   ws.on('close', () => {
//     console.log('Close connected')
//   })
// })

app.use(express.json());

app.get('/getSetting', async (req, res) => {
  var path = `C:\\Users\\user\\Documents\\GitHub\\Thermal_MO\\F\\20221031\\Yuan-Shang\\Thermal_MO`
  var files = fs.readdirSync(path);
  var arr = []
  files.forEach((item, index) => {
    // let fPath = join(path, item);
    let stat = fs.statSync(path);
    if (stat.isDirectory() === true) {
      jsonFiles.push(arr); 
    }
    if (stat.isFile() === true) {
      jsonFiles.push(arr);
    }
  })
  console.log(arr)
  // var config = getConfig()
  res.json({test:"2001"})
});

// const getConfig = () => {
//   const jsonData = fs.readFileSync('./config.json')
//   // console.log(JSON.parse(jsonData))
//   return JSON.parse(jsonData)
// }
module.exports = app
