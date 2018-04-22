'use strict';

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/userData.sqlite3');

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var userName = req.body.newUserName;
  var password = req.body.newPassword;

  console.log(userName);
  console.log(password);

  var isNameResistation =
    db.run('select * from userdata where name=$un limit 1',
    {$un:userName});

    console.log(isNameResistation);

  if (userName.replace(/\r?\n/g,"") === ""
    || password.replace(/\r?\n/g,"") === ""
    || userName === null
    || password === null) {
    res.render('register', {
      alert:'入力していない項目があります'
    });
  } else if (isNameResistation){
    res.render('register', {
      alert:'登録済みの名前です'
    });
  } else {
    //登録
    db.run('insert into userdata(name,password) values($un, $pwd)',
      {
        $un:userName,
        $pwd:password
      }
    );
  }
  if(!isNameResistation){
    db.close();
    res.redirect('/');
  }
});

module.exports = router;
