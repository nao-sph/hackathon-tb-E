'user strict'

// サーバから受信した投稿メッセージを画面上に表示する
function dispSelf(formatted,userName,message,imgURL){
    var str=`<div class="kaiwa">
				<figure class="kaiwa-img-right">
					<img src="${imgURL}" alt="no-img2″>
					<figcaption class="kaiwa-img-description">
					</figcaption>
				</figure>
				<div class="kaiwa-name-right">${userName}</div>
				<div class="kaiwa-text-left">
					<p class="kaiwa-text">${message}</p>
				</div>
				<div class="kaiwa-time-left">
					${formatted}
				</div>
			</div>`;
    $('#thread').append(str);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
}
function dispOther(formatted,userName,message,imgURL){
    var str=`<div class="kaiwa">
				<figure class="kaiwa-img-left">
					<img src="${imgURL}" alt="no-img2″>
					<figcaption class="kaiwa-img-description"></figcaption>
				</figure>
				<div class="kaiwa-name-left">${userName}</div>
				<div class="kaiwa-text-right">
					<p class="kaiwa-text">${message}</p>
				</div>
				<div class="kaiwa-time-right">${formatted}</div>
			</div>`;
    $('#thread').append(str);
    $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
}
