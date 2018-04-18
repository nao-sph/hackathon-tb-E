'use strict';

// 投稿メッセージをサーバに送信する
function publish() {

  if (document.getElementById('message').value.replace(/\r?\n/g,"") == "" || document.getElementById('message') == null ) {
      alert('投稿文を入力してください');
  } else {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    socket.emit('publish',message,userName);
    socket.emit('event2',userName);
    $('#message').val('');
    return false;
  }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('publish', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});

socket.on('alert', function (data) {
    alert(data);
});

socket.on('event2', function (data,userName){
    $('#thread').prepend('<p>'+ userName + '<p>');
});
