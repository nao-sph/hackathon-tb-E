'use strict'


$('#message').overlay([
    {
        match: /\B@\w+/g,
        css: {
            'background-color': '#d8dfea'
        }
    }
])
