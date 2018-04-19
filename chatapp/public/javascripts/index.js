'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する

    const userName = $('#userName').val();
    // ユーザ名が未入力でないかチェックする
    if(userName==''){
        // alert('ユーザー名を入力してください')
        $('#userName').val(Math.random().toString(36).slice(-8))
    }else{
        // $('form').submit();
    }
    $('form').submit();

}
$(document).ready(function(){
 $('select[name=logo]').ImageSelect({dropdownWidth:425});
 });
