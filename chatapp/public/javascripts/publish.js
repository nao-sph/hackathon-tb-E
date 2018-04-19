'use strict';

// 投稿メッセージをサーバに送信する

$( '#message' ).keypress( function ( e ) {
	if ( e.which == 13 ) {
		// ここに処理を記述
		if(event.shiftKey){
			$('#message').val()=$('#message').val()+'\n';
			return false;
		}
    publish();
		return false;
	}
} );

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
    // socket.emit('event2',userName);
    $('#message').val('');
    return false;
  }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('event1', function (user,formatted,message) {
	message=message.replace(/\r?\n/g, '<br>');
	var img='https://i2.wp.com/sozaikoujou.com/wordpress/wp-content/uploads/2016/06/th_app_icon_account.jpg?w=600&ssl=1';
	var img_self="http://flat-icon-design.com/f/f_object_114/s64_f_object_114_1bg.png";

    if(userName==user){
        dispSelf(formatted,user,message,img_self);
    }else{
        dispOther(formatted,user,message,img);
    }
});

socket.on('alert', function (data) {
    alert(data);
});
$('.line').modaal();
