'use strict';

module.exports = function (socket, io, UM, MM) {

    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (data) {
        let user = UM.choose(socket.id)
        console.log(user);
        user.setName(data.userName)
        user.setIcon(data.iconInfo)
        user.setEntryTime((new Date()).toFormat('HH24:MI'))
        MM.add(user, 'enter')
        console.log('enter', user);
        console.log('userList', UM.list);
        console.log('MessageList', MM.list);
        io.sockets.emit('enter', {user, UM, MM})
    });
};
