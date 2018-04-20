function msgEvent () {
	let msg = $('#message').val()
	msg = `<span class="kaiwa_highlight">${msg}</span>`
  $('#message').val(msg)
}
