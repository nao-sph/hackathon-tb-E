'use strict';

require('date-utils');

module.exports = function (socket, io, UM, MM) {
    // 退室メッセージをクライアントに送信する
    socket.on('disconnect', function () {
      let user = UM.deleteUser(socket.id, (new Date()).toFormat('HH24:MI'))
      MM.add(user, 'exit')
      io.sockets.emit('disconnect', {user, UM});
      console.log('disconnect', user);
    });
};
