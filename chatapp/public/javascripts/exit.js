'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    var answer = confirm('退室でよろしいですか？');
    if(!answer){
        return
    }
    // 退室メッセージイベントを送信する
    // socket.emit('exit', null);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('disconnect', function (data) {
    dispEnterMsg(data.user)
    dispUserList(data.UserManager)
});
