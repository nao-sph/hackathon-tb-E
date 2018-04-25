'use strict'

socket.on('name change', (data) => {
  dispClear()
  dispAll(data)
  dispUserList(data.UM)
})
