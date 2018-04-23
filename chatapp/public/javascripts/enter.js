//'use strict';

// var app = require('../app');
// var sessionMiddleware = app.session;
//
// var http = require('http');
// var port = normalizePort(process.env.PORT || '10041');
// app.set('port', port);
//
// var server = http.createServer(app);
// var io = require('socket.io')(server);
//
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
//
// io.use(function(socket, next){
//   sessionMiddleware(socket.req, socket.req.res, next);
// });

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
 const userName = 'test';
//const userName = socket.req.session.user;
const icon = $('#userIcon').val();
let isFirstEnter = true;

// 入室メッセージイベントを送信する
socket.emit('enter', {userName:userName, iconInfo:icon})

socket.on('enter', function (data) {
    if(isFirstEnter) { // 自身のenter処理
      isFirstEnter = false
      if(data.MM.isMax) {
        dispSystemMsg(`過去のメッセージは${data.MM.max}件までしか表示されません`)
      }
      for(let msg of data.MM.list) {
        switch(msg.type) {
          case 'msg':
            dispMsg(msg.data)
            break
          case 'enter':
            dispEnterMsg(msg.data)
            break
          case 'exit':
            dispExitMsg(msg.data)
            break
          case 'system':
            dispSystemMsg(msg.data)
            break
          default:

        }
      }
    } else {
      // 他の人のenterを表示
      dispEnterMsg(data.user)
    }
    // user-listの出力
    dispUserList(data.UM)
});
