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
        this.icon = null
      }
      setName (name) {
        this.name = name
      }
      setEntryTime (time) {
        this.entryTime = time
      }
      setIcon (iconInfo) {
        this.icon = iconInfo
      }
    }

    class MessageManager {
      constructor() {
        this.list = []
        this.max = 100 // メッセージの保管数上限
      }
      addMsg (msgObj) {
        if(this.list.length >= this.max){
          this.list.shift()
        }
        this.list.push(msgObj)
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
        require('./enter')(socket, io, UM, MM);

        // 退室モジュールの呼出
        require('./exit')(socket, io, UM);
    });
};
