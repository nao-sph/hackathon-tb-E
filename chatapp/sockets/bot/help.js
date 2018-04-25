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
  socket.on('help', (data) => { // keywordは自分で設定する

    // ここに処理を書く
    let msg =`
      @bot keyword 引数1<br>
      　というように使う<br>
      　ex) @bot hello World<br>
      hello:<br>
      　引数に対してHello 〇〇!を返す<br>
      　引数を取らない場合は Hello Link!<br>
      calc:<br>
      　引数の計算結果を返す<br>
      rename:<br>
      　引数を自身の名前にする<br>
      list:<br>
      　引数を取らない<br>
      　現在roomにいる人の名前を返す<br>
      help:<br>
      　これ<br>
    `

    data = new Message(msg, (new Date()).toFormat('HH24:MI')) // データの整形
    MM.add(data, 'msg')
    io.sockets.emit('bot', data) // botイベント
  })
}
