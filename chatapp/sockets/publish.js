'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (data,userName) {
      io.sockets.emit('event1',data,userName);

    });
};
