'use strict';
require('date-utils');

var postTimeData = new Array();

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (message,userName) {
      var event1Frag = 1;
      var date = new Date();
      var data = ''

      if(userName in postTimeData == true && date.getTime()-postTimeData[userName].getTime() < 60*1000){
        event1Frag = 0;
        data += '前回の投稿から1分経過していません。';
      }
      if (userName in postTimeData){
        event1Frag = 0;
        data += '同じユーザーは連続して投稿できません。';
      }

      if (event1Frag == 1){
        postTimeData[userName] = date;
        var formatted = date.toFormat('HH24時MI分');
        data = '[' + formatted + ']' + userName + 'さん:' + message;
        io.sockets.emit('event1',data);
        console.log(data);
      } else if (event1Frag == 0){
        socket.emit('alert', data);
      }
      console.log(Math.floor(date.getTime()-postTimeData[userName].getTime()));
    });
    socket.on('event2', function(data,userName){
      io.sockets.emit('event2',data,userName);
    });
};
