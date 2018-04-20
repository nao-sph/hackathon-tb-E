'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
const icon = $('#userIcon').val()
let isFirstEnter = true

// 入室メッセージイベントを送信する
socket.emit('enter', {userName:userName, iconInfo:icon})

socket.on('enter', function (data) {
    if(isFirstEnter) { // 自身のenter処理
      isFirstEnter = false
      // dispSystemMsg(`過去のメッセージは${data.MM.max}件まで表示されます`)
      for(let msg of data.MM.list) {
        switch(msg.type) {
          case 'msg':
            dispMsg(msg.data)
            break
          case 'enter':
            dispEnterMsg(msg.data)
            break
            break
          case 'system':
            dispSystemMsg(msg.data)
            break
          default:

        }
      }
    }
    // enter処理
    dispEnterMsg(data.user.name)
    // user-listの出力
    dispUserList(data.UM)
});
