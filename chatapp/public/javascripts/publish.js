'use strict';

// 投稿メッセージをサーバに送信する
$( '#message' ).keypress( function ( e ) {
	if ( e.which == 13 ) {
		// ここに処理を記述
		if(event.shiftKey){
			$( '#message' ).val()=$( '#message' ).val()+"\n";
			return false;
		}
        publish();
		return false;
	}
} );
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

function dispSelf(formatted,userName,message){
    var str='<div class="kaiwa"><figure class="kaiwa-img-right"><img src="https://i2.wp.com/sozaikoujou.com/wordpress/wp-content/uploads/2016/06/th_app_icon_account.jpg?w=600&ssl=1" alt="no-img2″><figcaption class="kaiwa-img-description"></figcaption></figure><div class="kaiwa-name-right">'+userName+'</div><div class="kaiwa-text-left"><p class="kaiwa-text">'+message+'</p></div><div class="kaiwa-time-left">'+formatted+'</div></div>';
    $('#thread').append(str);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
}
function dispOther(formatted,userName,message){
    var str='<div class="kaiwa"><figure class="kaiwa-img-left"><img src="https://i2.wp.com/sozaikoujou.com/wordpress/wp-content/uploads/2016/06/th_app_icon_account.jpg?w=600&ssl=1" alt="no-img2″><figcaption class="kaiwa-img-description"></figcaption> </figure><div class="kaiwa-name-left">'+userName+'</div><div class="kaiwa-text-right"><p class="kaiwa-text">'+message+'</p></div><div class="kaiwa-time-right">'+formatted+'</div></div>';
    $('#thread').append(str);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
}
// サーバから受信した投稿メッセージを画面上に表示する
socket.on('event1', function (user,formatted,message) {
	message=message.replace(/\r?\n/g, '<br>');
    if(userName==user){
        dispSelf(formatted,user,message);
    }else{
        dispOther(formatted,user,message);
    }
});
socket.on('event2', function (data,userName){
    $('#thread').append('<p>'+ userName + data + '<p>');
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
});
