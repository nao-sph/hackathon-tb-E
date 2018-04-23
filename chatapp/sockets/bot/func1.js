'use strict'

module.exports = function (socket, io, UM, MM) {
  socket.on('keyword', (data) => {

    io.sockets.emit('bot', data) // botイベント
  })
}
