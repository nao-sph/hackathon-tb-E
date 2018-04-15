'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモの内容を表示
    $('#thread').append('<p class="memo">' + userName + 'さんのメモ: ' + message + '</p>');
    $("#thread").scrollTop( $("#thread")[0].scrollHeight );
    // メモの内容を空にする
    $('#message').val('')

    return false;
}
