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
      $('#thread').append(`<p class="infoMsg">過去のメッセージは${data.MessageManager.max}件まで表示されます</p>`)
      for(let msg of data.MessageManager.list) {
        $('#thread').append(msg)
      }
    }
    // enter処理
    $('#thread').append(`<p class="enterMsg">${data.entryUser.name}さんが入室しました。</p>`);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
    // user-listの出力
    $('#user-list').val('')
    $('#user-list').append(`<span>login users: </span>`)
    for(let user of data.UserManager.list) {
      $('#user-list').append(`<span>${user.id} </span>`)
    }
});
