'use strict';

module.exports = function (socket, io, UM, MM) {

    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (data) {
        let user = UM.choose(socket.id)
        // user.name = data
        console.log(user);
        user.setName(data)
        user.setEntryTime(new Date())
        console.log('enter', user);
        console.log('userList', UM.list);
        console.log('MM', MM);
        socket.emit('enter', {entryUser: user, userList: UM.list, MM: Object.assign(MM)})
    });
};
