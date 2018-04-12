'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').value();
    // 入力されたメッセージを取得
    const message = $('#message');
    // メモの内容を表示
    $('#thread').prepend('<p>' + '</p>');

    return false;
}
