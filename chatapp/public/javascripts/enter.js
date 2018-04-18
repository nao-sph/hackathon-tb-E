'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();

// 入室メッセージイベントを送信する
socket.emit('enter', userName)

// サーバから受信した入室メッセージを画面上に表示する
socket.on('enter', function (data) {
    $('#thread').append('<p id="enter">' + data.entryUser.name + 'さんが入室しました。</p>');
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
    $('user-list').append(data)
});
