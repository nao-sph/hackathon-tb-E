'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
//const userName = socket.request.session.user;
const icon = $('#userIcon').val();
let isFirstEnter = true;

// 入室メッセージイベントを送信する
socket.emit('enter', {userName:userName, iconInfo:icon})

socket.on('enter', function (data) {
    if(isFirstEnter) { // 自身のenter処理
      isFirstEnter = false
      dispAll(data)
    } else {
      // 他の人のenterを表示
      dispEnterMsg(data.user)
    }
    // user-listの出力
    dispUserList(data.UM)
});
