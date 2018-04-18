'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    class UserManager {
      constructor () {
        this.list = []
      }

      choose (id) {
        for(let user of this.list){
          if(user.id === id) {
            return user
          }
        }
        return -1
      }
      newUser (user) {
        this.list.push(user)
      }
      getIDbyName (name) {
        for(let user of this.list) {
          user.name === name
          return user.id
        }
        return -1
      }
    }

    class User {
      constructor (id) {
        this.id = id
        this.name = null
        this.entryTime = null
      }
      setName (name) {
        this.name = name
      }
      setEntryTime (time) {
        this.entryTime = time
      }
    }

    class MessageManager {
      constructor() {
        this.msgList = []
        this.max = 100 // メッセージの保管数上限
      }
      addMsg (msgObj) {
        if(this.msgList.length >= this.max){
          this.msgList.shift()
        }
        this.msgList.push(msgObj)
      }
    }

    class Message {
      constructor (msg, publisherID, time) {
        this.msg = msg
        this.publisherID = publisherID
        this.time = time
      }
    }

    const UM = new UserManager()
    const MM = new MessageManager()

    io.sockets.on('connection', function (socket) {
        let user = new User(socket.id)
        UM.newUser(user)

        // 投稿モジュールの呼出
        require('./publish')(socket, io, UM, MM);

        // 入室モジュールの呼出
        require('./enter')(socket, io, UM);

        // 退室モジュールの呼出
        require('./exit')(socket, io, UM);
    });
};
