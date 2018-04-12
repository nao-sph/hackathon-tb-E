'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (data) {
        console.log('enter', data);
        socket.broadcast.emit('enter', data)
    });
};
