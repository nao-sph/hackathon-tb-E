'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (message,userName) {
      const data = userName + 'さん:' + message;
      io.sockets.emit('event1',data);
      console.log(data);
    });
    socket.on('event2', function(data,userName){
      io.sockets.emit('event2',data,userName);

    });
};
