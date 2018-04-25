'use strict'

require('date-utils');

const botInfo = {
  id: 'bot',
  name: 'bot',
  icon: 0
}

class Message {
  constructor (msg, time) {
    this.msg = msg
    this.user = botInfo
    this.time = time
  }
}

module.exports = function (socket, io, UM, MM) {
    socket.on('calc', (data) => { // keywordは自分で設定する
        if(/[A-Za-z_]/.test(data[0])==true){
            var msg='使用できない文字が含まれています';
        }else{
            var msg=eval(data[0]);
        }


      data = new Message(msg, (new Date()).toFormat('HH24:MI')) // データの整形
      MM.add(data, 'msg')
      io.sockets.emit('bot', data) // botイベント
    })
}
