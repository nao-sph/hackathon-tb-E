'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    var answer = confirm('退室でよろしいですか？');
    if(answer==false){
        return
    }
    const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    socket.emit('exit', userName);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit', function (data) {
    $('#thread').append('<p class="exit">' + data.name + 'さんが退室しました。</p>');
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
    dispUserList(data.UserManager)
});
