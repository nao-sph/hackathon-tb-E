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
  socket.on('list', (data) => { // keywordは自分で設定する
    let msg = ''

    // ここに処理を書く
    for(let idx in UM.list) {
      msg += `@${UM.list[idx].name}`
      if('' + idx !== '' + (UM.list.length - 1)){
        msg += ', '
      }
    }

    data = new Message(msg, (new Date()).toFormat('HH24:MI')) // データの整形
    MM.add(data, 'msg')
    io.sockets.emit('bot', data) // botイベント
  })
}
