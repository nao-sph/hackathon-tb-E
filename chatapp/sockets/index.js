'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    class UserManager {
      constructor () {
        this.list = []
        this.pastList = []
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
      deleteUser (id, time){
        for(let idx in this.list){
          let user = this.list[idx]
          if(user.id === id){
            user.serExitTime(time)
            this.pastList.push(user)
            this.list.splice(idx, 1)
            console.log(`delete user:${id}`);
            console.log('UserList', this.list);
            console.log('deletedUserList', this.pastList);
            return user
          }
        }
        console.log(`cannot find user:${id}`);
        return -1
      }
    }

    class User {
      constructor (id) {
        this.id = id
        this.name = null
        this.entryTime = null
        this.exitTime = null
        this.icon = null
      }
      setName (name) {
        this.name = name
      }
      setEntryTime (time) {
        this.entryTime = time
      }
      serExitTime (time) {
        this.exitTime = time
      }
      setIcon (iconInfo) {
        this.icon = iconInfo
      }
    }

    class MessageManager {
      constructor() {
        this.list = []
        this.max = 100 // メッセージの保管数上限
        this.isMax = false
      }
      add (msg, type) {
        let msgObj = {
          type: type,
          data: msg
        }
        if(this.list.length >= this.max){
          this.isMax = true
          this.list.shift()
        }
        this.list.push(msgObj)
      }
    }


    const UM = new UserManager()
    const MM = new MessageManager()

    // socket接続時
    io.sockets.on('connection', function (socket) {
        // userの追加
        let user = new User(socket.id)
        UM.newUser(user)

        require('./bot/hello')(socket, io, UM, MM)
        require('./bot/list')(socket, io, UM, MM)
        require('./bot/rename')(socket, io, UM, MM)
        require('./bot/calc')(socket, io, UM, MM)
        require('./bot/help')(socket, io, UM, MM)

        // 投稿モジュールの呼出
        require('./publish')(socket, io, UM, MM);

        // 入室モジュールの呼出
        require('./enter')(socket, io, UM, MM);

        // 退室モジュールの呼出
        require('./exit')(socket, io, UM, MM);
    });
};
