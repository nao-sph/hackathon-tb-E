'use strict';

module.exports = function (socket, io, UM) {
    // 退室メッセージをクライアントに送信する
    socket.on('disconnect', function () {
      console.log('disconnect', socket.id);
      let name = UM.choose(socket.id).name
      console.log('disconnect', name);
      let user = UM.deleteUser(socket.id)
      io.sockets.emit('disconnect', {user, UM});
    });
};
