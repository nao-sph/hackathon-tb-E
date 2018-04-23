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
  socket.on('hello', (data) => {
    console.log('hello', data);
    let msg = data[0]
    if(msg === null || msg === undefined){
      msg = 'Link'
    }
    msg = `Hello ${msg}!`

    data = new Message(msg, (new Date()).toFormat('HH24:MI')) // データの整形
    MM.add(data, 'msg')
    io.sockets.emit('bot', data) // botイベント
  })
}
