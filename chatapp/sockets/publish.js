'use strict';
require('date-utils');

var postTimeData = new Array();
const publishTwice = false // 同じ人が続けて投稿できるならtrueに変更
const publishSpan = 3 // 連続投稿と見なされる時間[sec]

class Message {
  constructor (msg, user, time) {
    this.msg = msg
    this.user = user
    this.time = time
  }
}

module.exports = function (socket, io, UM, MM) {
    // 投稿メッセージを送信する
    socket.on('publish', function (data) {
      let message = data.message
      var isAblePublish = true;
      var date = new Date();
      data = withErr(true, 'something wrong', null)
      let user = UM.choose(socket.id)
      var Msg = new Message(message.replace(/\r?\n/g, '<br>'), user, date.toFormat('HH24:MI'))

      if(socket.id in postTimeData == true && date.getTime() - postTimeData[socket.id].getTime() < publishSpan * 1000){
        isAblePublish = false;
        data = withErr(
          true,
          `前回の投稿から${publishSpan}秒経過していません。`,
          Msg
        )
      }
      if (socket.id in postTimeData && publishTwice){
        isAblePublish = false
        data = withErr(
          true,
          `同じユーザーは連続して投稿できません。`,
          Msg
        )
      }

      if (isAblePublish){
        postTimeData[socket.id] = date;
        data = withErr(false, null, Msg)
        MM.add(Msg, 'msg')
        io.sockets.emit('publish', data);
      } else {
        socket.emit('publish', data)
      }
      console.log('publish', data);
      // console.log(Math.floor(date.getTime()-postTimeData[socket.id].getTime()));
      // console.log(postTimeData[0]);
    });
};

function withErr(isErr, msg, data) {
  return {
    isErr: isErr,
    errMsg: msg,
    data: data
  }
}
