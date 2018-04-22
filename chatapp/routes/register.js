'use strict';

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/userData.sqlite3');

router.get('/', function(req, res, next) {
  res.render('register');
});

console.log('hello');

router.post('/', function(req, res, next) {
  var userName = req.body.newUserName;
  var password = req.body.newPassword;

  console.log(userName);
  console.log(password);

  if (!userName.replace(/\r?\n/g,"") === ""
    && !password.replace(/\r?\n/g,"") === ""
    || !userName === null
    || !password === null) {
    //登録
    db.run('insert into userdata(name,password) values($un, $pwd)',
      {
        $un:userName,
        $pwd:password
      }
    );
    db.close();
  }
  res.redirect('/');
});

module.exports = router;
