'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
      data = data + ('さんが退室しました');
      console.log(data);
      socket.broadcast.emit('exit', data);
    });
};
