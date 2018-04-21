'user strict'

/****
  チャット内表示
****/
// 入室メッセージ
function dispEnterMsg (user) {
  $('#thread').append(`<p class="enterMsg">${user.entryTime} ${user.name}さんが入室しました。</p>`);
  scrollTop()
}
// 退室メッセージ
function dispExitMsg (user) {
  $('#thread').append(`<p class="enterMsg">${user.exitTime} ${user.name}${name}さんが退室しました。</p>`);
  scrollTop()
}
// システムメッセージ
function dispSystemMsg (msg) {
  $('#thread').append(`<p class="infoMsg">${msg}</p>`)
  scrollTop()
}

// 自身の投稿
function dispMsg (data) {
  if(data.user.id === socket.id) {
    dispSelf(data)
  } else {
    dispOther(data)
  }
  scrollTop()
}
function dispSelf (data){
    var str=`<div class="kaiwa">
				<figure class="kaiwa-img-right">
					<img src="../img/icon${data.user.icon}.png" alt="no-img2″>
					<figcaption class="kaiwa-img-description">
					</figcaption>
				</figure>
				<div class="kaiwa-name-right">${data.user.name}</div>
				<div class="kaiwa-text-left">
					<p class="kaiwa-text">${data.msg}</p>
				</div>
				<div class="kaiwa-time-left">
					${data.time}
				</div>
			</div>`;
    $('#thread').append(str);
}
// 他の人の投稿
function dispOther (data){
    var str=`<div class="kaiwa">
				<figure class="kaiwa-img-left">
					<img src="../img/icon${data.user.icon}.png" alt="no-img2″>
					<figcaption class="kaiwa-img-description"></figcaption>
				</figure>
				<div class="kaiwa-name-left">${data.user.name}</div>
				<div class="kaiwa-text-right">
					<p class="kaiwa-text">${data.msg}</p>
				</div>
				<div class="kaiwa-time-right">${data.time}</div>
			</div>`;
    $('#thread').append(str);
}

function scrollTop () {
  $('#thread-room').animate({scrollTop: $('#thread-room')[0].scrollHeight}, 'fast');
}

/****
  その他
****/
// ユーザーリストの格納
function dispUserList(UM){
  $('#user-list').empty()
  // $('#user-list').append(`<span>オンラインユーザー: </span><br>`)
  for(let user of UM.list) {
    $('#user-list').append(`<span>${user.name}: LastLogin ${user.entryTime}</span><br>`)
  }
}
