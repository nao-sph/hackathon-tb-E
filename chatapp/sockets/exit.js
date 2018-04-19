'use strict';

module.exports = function (socket, io, UM) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
      console.log('exit', data);
      // UM.
      socket.broadcast.emit('exit', {name:data, UserManager:UM});
    });
};
