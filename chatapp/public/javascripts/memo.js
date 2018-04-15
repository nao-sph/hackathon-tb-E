'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモの内容を表示
    if(message!=""){
    $('#thread').append('<p class="memo">&nbsp　' + userName + 'さんのメモ: ' + message + '</p>');
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
    // メモの内容を空にする
    $('#message').val('')
}else{
    alert('空文字またはnullです');
}
    return false;
}
