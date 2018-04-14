'use strict';

// 投稿メッセージをサーバに送信する
function publish() {

  if (document.getElementById('message').value.replace(/\r?\n/g,"") == "" || document.getElementById('message') == null ) {
      alert('空文字またはnullです');
  } else {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    socket.emit('event1',message,userName);
    // io.to(socket.id).emit('event2',data,userName);
    $('#message').val('');
    return false;
  }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('event1', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});
socket.on('event2', function (data,userName){
    $('#thread').prepend('<p>'+ userName + data + '<p>');
});
