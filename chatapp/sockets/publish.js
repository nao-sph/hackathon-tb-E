'use strict';
require('date-utils');

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (message,userName) {
      var date = new Date();
      var formatted = date.toFormat('HH24時MI分')

      const data = '[' + formatted + ']' + userName + 'さん:' + message;
      io.sockets.emit('event1',data);
      console.log(data);
    });
    socket.on('event2', function(data,userName){
      io.sockets.emit('event2',data,userName);
    });
};
