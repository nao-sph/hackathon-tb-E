'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('event1', function (data) {
      io.sockets.emit('event1',data);

    });
};
