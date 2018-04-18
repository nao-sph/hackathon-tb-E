'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
let isFirstEnter = true

// 入室メッセージイベントを送信する
socket.emit('enter', userName)

// 自身のenter処理
socket.on('enter', function (data) {
    if(isFirstEnter) {
      isFirstEnter = false
      $('#thread').append(`<p class="infoMsg">過去のメッセージは${data.MM.max}件まで表示されます</p>`)
      for(let msg of data.MM.list) {
        $('#thread').append(msg)
      }
    }
    $('#thread').append(`<p class="enterMsg">${data.entryUser.name}さんが入室しました。</p>`);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
    for(let user of data.userList) {
      $('user-list').append(`<span>${user.name} </span>`)
    }
});

// 他の人のenter処理
