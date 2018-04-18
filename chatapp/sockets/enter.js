'use strict';

module.exports = function (socket, io, UM) {

    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (data) {
        let user = UM.choose(socket.id)
        // user.name = data
        console.log(user);
        user.setName(data)
        user.setEntryTime(new Date())
        console.log('enter', user);
        console.log('userList', UM.list);
        socket.broadcast.emit('enter', {entryUser: user, userList: UM.list})
    });
};
