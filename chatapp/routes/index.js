'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log(`アイコンナンバー:${request.body.userIcon}`);
    response.render('room', { userName: request.body.userName, userIcon: request.body.userIcon});
});

module.exports = router;
