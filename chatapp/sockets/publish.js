'use strict';
require('date-utils');

var postTimeData = new Array();

module.exports = function (socket, io, UM, MM) {
    // 投稿メッセージを送信する
    socket.on('publish', function (message,userName) {
      const publishSpan = 3 // 連続投稿と見なされる時間[sec]
      var isAblePublish = true;
      var date = new Date();
      var msg = ''

      if(userName in postTimeData == true && date.getTime() - postTimeData[userName].getTime() < publishSpan * 1000){
        isAblePublish = false;
        msg += `前回の投稿から${publishSpan}秒経過していません。`;
      }
      // if (userName in postTimeData){
      //   isAblePublish = false
      //   msg += `同じユーザーは連続して投稿できません。`;
      // }

      if (isAblePublish){
        postTimeData[userName] = date;
        var formatted = date.toFormat('HH24時MI分');
        msg = '[' + formatted + ']' + userName + 'さん:' + message;
        io.sockets.emit('publish',msg);
        console.log(msg);
      } else {
        socket.emit('alert', msg);
      }
      console.log(Math.floor(date.getTime()-postTimeData[userName].getTime()));
    });
    // socket.on('event2', function(msg,userName){
    //   io.sockets.emit('event2',data,userName);
    // });
};
