'use strict';

// 投稿メッセージをサーバに送信する
$( '#message' ).keypress( function ( e ) {
	if ( e.which == 13 ) {
		// ここに処理を記述
		if(event.shiftKey){
			$('#message').val($('#message').val()+'\n')
			return false;
		}
    publish();
		return false;
	}
} );

function publish () {
  if ($('#message').val().replace(/\r?\n/g,"") === "" || $('#message') === null ) {
      alert('投稿文を入力してください');
  } else {
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
		socket.emit('publish',{message});
    $('#message').val('');
    return false;
  }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('publish', function (data) {
	if(data.isErr) {
		// エラー処理
		alert(data.errMsg);
		$('#message').val(data.data.msg)
		return
	}
	dispMsg(data.data)
	msgEvent(data.data.msg)
});

// @bot
function msgEvent (str){
	let args = str.split(' ')
	if(args[0] === '@bot') {
		socket.emit(args[1], args.slice(2))
	}
}

// botのメッセージ表示
socket.on('bot', (data) => {
	dispMsg(data)
})


// 多分ユーザーリストの表示？
$('.line').modaal();
