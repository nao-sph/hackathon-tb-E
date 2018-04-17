'use strict';
require('date-utils');

var postTimeData = new Array();

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (message,userName) {
      var event1Frag = 1;
      var date = new Date();

      // if(userName in postTimeData == true && date.getTime()-postTimeData[userName].getTime() < 60*1000){
      //   event1Frag = 0;
      // }

      if (event1Frag == 1){
        postTimeData[userName] = date;
        var formatted = date.toFormat('HH24時MI分');
        const data = '[' + formatted + ']' + userName + 'さん:' + message;
        io.sockets.emit('event1',data);
        console.log(data);
      } else if (event1Frag == 0){
        socket.emit('alert');
      }
      console.log(Math.floor(date.getTime()-postTimeData[userName].getTime()));
    });
    socket.on('event2', function(data,userName){
      io.sockets.emit('event2',data,userName);
    });
};
